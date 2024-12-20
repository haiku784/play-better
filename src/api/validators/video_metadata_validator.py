from pydantic import BaseModel, validator

class VideoMetadata(BaseModel):
    title: str
    description: str
    duration: int
    uploaded_by: str
    tags: list

    @validator('duration')
    def duration_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('Duration must be positive')
        return v
