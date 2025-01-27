class StopRecordingRequest(BaseModel):
    recordingId: str

class StopRecordingResponse(BaseModel):
    status: str
    filePath: str

@app.post('/stop-recording', response_model=StopRecordingResponse)
async def stop_recording(request: StopRecordingRequest):
    # Business logic to stop the recording session
    # Here, we simulate stopping the recording and generating a file path
    file_path = f"/recordings/{request.recordingId}.mp4"
    # Simulate successful stop of recording
    return StopRecordingResponse(status='success', filePath=file_path)