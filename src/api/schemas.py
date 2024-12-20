from pydantic import BaseModel

class UserFeedback(BaseModel):
    user_id: str
    feedback: str

class UploadResponse(BaseModel):
    filename: str
    message: str