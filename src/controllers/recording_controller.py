from fastapi import FastAPI, HTTPException
from error_logger import ErrorLogger

app = FastAPI()

@app.post('/start-recording')
def start_recording():
    try:
        # Code to start recording
        ErrorLogger.log_info('Recording started successfully.')
    except Exception as e:
        ErrorLogger.log_error(f'Error starting recording: {str(e)}')
        raise HTTPException(status_code=500, detail='Error starting recording')

@app.post('/stop-recording')
def stop_recording():
    try:
        # Code to stop recording
        ErrorLogger.log_info('Recording stopped successfully.')
    except Exception as e:
        ErrorLogger.log_error(f'Error stopping recording: {str(e)}')
        raise HTTPException(status_code=500, detail='Error stopping recording')