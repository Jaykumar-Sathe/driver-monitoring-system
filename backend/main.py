from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from detector import start_detection, status_data
import threading

# Create app FIRST
app = FastAPI()

# THEN add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/status")
def get_status():
    return status_data

@app.on_event("startup")
def startup_event():
    thread = threading.Thread(target=start_detection)
    thread.daemon = True
    thread.start()
