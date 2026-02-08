# Driver Monitoring System 🚗

An AI-powered Driver Monitoring System that detects fatigue and distraction in real time using computer vision and displays analytics on a modern web dashboard.

---

## Overview

This project uses computer vision techniques to monitor a driver’s state through a webcam feed and calculates a fatigue score in real time. The system provides visual alerts and analytics through a responsive web dashboard.

The goal of this project is to demonstrate how AI can improve road safety by detecting early signs of driver fatigue.

---

## Features

* Real-time fatigue detection
* Eye closure and fatigue scoring
* Fatigue level classification (Safe / Warning / Critical)
* Live fatigue score graph
* Trip summary analytics
* Real-time dashboard UI
* Responsive Tailwind-based frontend
* FastAPI backend

---

## Tech Stack

### Frontend

* React
* Tailwind CSS
* Recharts (for graphs)
* Axios

### Backend

* FastAPI
* OpenCV
* MediaPipe
* NumPy

---

## Project Structure

```
driver-monitoring-system/
│
├── backend/
│   ├── main.py
│   ├── detector.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## How to Run the Project

### 1. Clone Repository

```
git clone https://github.com/yourusername/driver-monitoring-system.git
cd driver-monitoring-system
```

---

### 2. Backend Setup

```
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### 3. Frontend Setup

Open a new terminal:

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## System Architecture

Camera → OpenCV + MediaPipe → Fatigue Detection Logic → FastAPI → React Dashboard

---

## Screenshots

## Future Improvements

* Driver attention score gauge
* Mobile responsive dashboard improvements
* Cloud deployment
* Audio alert optimization
* Driver behavior analytics

---

## Applications

* Automotive safety systems
* Fleet monitoring
* Driver assistance systems
* Research and academic projects

---

## Author

Jaykumar Sathe
Third Year Engineering Student
Project: Driver Monitoring System

---

## License

This project is for academic and learning purposes.
