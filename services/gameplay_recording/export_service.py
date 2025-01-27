from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class ExportRequest(BaseModel):
    userId: str
    videoId: str
    format: str

class ExportResponse(BaseModel):
    status: str
    downloadLink: str = None
    errorMessage: str = None

@app.post('/export/video', response_model=ExportResponse)
async def export_video(request: ExportRequest):
    # Implement the export process here using modules
    retrieval_module = VideoRetrievalModule(storage_service)
    conversion_module = VideoConversionModule()

    video = retrieval_module.retrieve_video(request.videoId, request.userId)
    if video['errorMessage']:
        raise HTTPException(status_code=400, detail=video['errorMessage'])

    video_data = video['videoData']
    converted_video = conversion_module.convert_video(video_data, request.format)
    if converted_video['errorMessage']:
        raise HTTPException(status_code=400, detail=converted_video['errorMessage'])

    # Assume we generate a download link
    download_link = 'http://example.com/download/{}'.format(request.videoId)
    return {'status': 'success', 'downloadLink': download_link}