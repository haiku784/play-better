from fastapi import HTTPException

class VideoRetrievalModule:
    def __init__(self, storage_service):
        self.storage_service = storage_service

    def retrieve_video(self, video_id: str, user_id: str) -> dict:
        try:
            # Fetch video data from the storage
            video_data = self.storage_service.get_video(video_id)
            if not video_data:
                raise ValueError('Video not found')
            return {'videoData': video_data, 'errorMessage': None}
        except Exception as e:
            return {'videoData': None, 'errorMessage': str(e)}