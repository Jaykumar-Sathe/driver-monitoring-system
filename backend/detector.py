import cv2
import mediapipe as mp
import numpy as np
import time
import winsound   # Windows only

# Shared status dictionary (used by FastAPI)
status_data = {
    "status": "CALIBRATING...",
    "fatigue_score": 0,
    "fatigue_level": "SAFE"
}

# ---------------- Landmark Indices ----------------
LEFT_EYE = [33, 160, 158, 133, 153, 144]
RIGHT_EYE = [362, 385, 387, 263, 373, 380]
MOUTH = [13, 14, 78, 308]

# ---------------- Utility Functions ----------------
def euclidean(p1, p2):
    return np.linalg.norm(np.array(p1) - np.array(p2))

def eye_aspect_ratio(landmarks, eye):
    v1 = euclidean(landmarks[eye[1]], landmarks[eye[5]])
    v2 = euclidean(landmarks[eye[2]], landmarks[eye[4]])
    h = euclidean(landmarks[eye[0]], landmarks[eye[3]])
    return (v1 + v2) / (2.0 * h)

def mouth_aspect_ratio(landmarks):
    vertical = euclidean(landmarks[MOUTH[0]], landmarks[MOUTH[1]])
    horizontal = euclidean(landmarks[MOUTH[2]], landmarks[MOUTH[3]])
    return vertical / horizontal

def head_drop_ratio(landmarks):
    nose_y = landmarks[1][1]
    chin_y = landmarks[152][1]
    forehead_y = landmarks[10][1]
    return (chin_y - nose_y) / (chin_y - forehead_y)

# ---------------- Thresholds ----------------
EAR_THRESHOLD = 0.21
MAR_THRESHOLD = 0.6
EYES_CLOSED_TIME = 2.5
HEAD_DROP_THRESHOLD = 0.06
REQUIRED_FRAMES = 8
CALIBRATION_TIME = 2.0

# ---------------- Main Detection Function ----------------
def start_detection():

    mp_face_mesh = mp.solutions.face_mesh
    face_mesh = mp_face_mesh.FaceMesh(
        static_image_mode=False,
        max_num_faces=1,
        refine_landmarks=True,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5
    )

    # ---------------- State Variables ----------------
    eye_close_start = None
    baseline_values = []
    baseline = None
    drop_counter = 0
    start_time = time.time()

    fatigue_score = 0
    last_fatigue_update = time.time()
    last_yawn_time = 0
    head_drop_registered = False
    last_alarm_time = 0

    cap = cv2.VideoCapture(0)

    print("Driver Monitoring Started...")

    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        h, w, _ = frame.shape
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = face_mesh.process(rgb)

        status = "SAFE"
        fatigue_level = "SAFE"

        if result.multi_face_landmarks:
            face = result.multi_face_landmarks[0]
            landmarks = [(int(l.x * w), int(l.y * h)) for l in face.landmark]

            # -------- Metrics --------
            ear = (
                eye_aspect_ratio(landmarks, LEFT_EYE) +
                eye_aspect_ratio(landmarks, RIGHT_EYE)
            ) / 2.0

            mar = mouth_aspect_ratio(landmarks)
            head_ratio = head_drop_ratio(landmarks)

            # -------- Calibration --------
            if baseline is None:
                baseline_values.append(head_ratio)
                status = "CALIBRATING..."
                if time.time() - start_time >= CALIBRATION_TIME:
                    baseline = np.mean(baseline_values)
            else:
                if head_ratio < baseline - HEAD_DROP_THRESHOLD:
                    drop_counter += 1
                else:
                    drop_counter = 0

            # -------- Eye State --------
            eyes_state = "EYES OPEN"

            if ear < EAR_THRESHOLD:
                if eye_close_start is None:
                    eye_close_start = time.time()
                else:
                    eyes_state = "EYES CLOSED"
            else:
                eye_close_start = None

            # -------- Priority Logic --------
            if baseline is None:
                status = "CALIBRATING..."
            elif drop_counter >= REQUIRED_FRAMES:
                status = "HEAD DROP"
            elif eye_close_start and time.time() - eye_close_start >= EYES_CLOSED_TIME:
                status = "DROWSY"
            elif eyes_state == "EYES CLOSED":
                status = "EYES CLOSED"
            elif mar > MAR_THRESHOLD:
                status = "YAWNING"
            else:
                status = "SAFE"

            # -------- Fatigue Score --------
            now = time.time()
            dt = now - last_fatigue_update

            if dt >= 1:
                if status == "EYES CLOSED":
                    fatigue_score += 1
                elif status == "DROWSY":
                    fatigue_score += 3
                elif status == "HEAD DROP":
                    if not head_drop_registered:
                        fatigue_score += 20
                        head_drop_registered = True
                elif status == "YAWNING":
                    if now - last_yawn_time > 3:
                        fatigue_score += 5
                        last_yawn_time = now
                else:
                    fatigue_score -= 1

                fatigue_score = int(np.clip(fatigue_score, 0, 100))
                last_fatigue_update = now

            if status != "HEAD DROP":
                head_drop_registered = False

            # -------- Fatigue Level --------
            if fatigue_score <= 30:
                fatigue_level = "SAFE"
            elif fatigue_score <= 60:
                fatigue_level = "WARNING"
            else:
                fatigue_level = "CRITICAL"

            # -------- ALARM LOGIC (FIXED) --------
            if fatigue_level == "CRITICAL":
                if now - last_alarm_time > 1:
                    winsound.Beep(2500, 800)
                    last_alarm_time = now

            elif fatigue_level == "WARNING":
                if now - last_alarm_time > 3:
                    winsound.Beep(1500, 300)
                    last_alarm_time = now

            else:
                # Reset alarm timer when SAFE
                last_alarm_time = now


            # -------- Display Window --------
            cv2.putText(frame, f"Fatigue Score: {fatigue_score}", (20, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255,255,255), 2)

            cv2.putText(frame, f"Status: {status}", (20, 80),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,255,0), 2)

        # -------- Update API Data --------
        status_data["status"] = status
        status_data["fatigue_score"] = fatigue_score
        status_data["fatigue_level"] = fatigue_level

        cv2.imshow("Driver Monitoring System", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
