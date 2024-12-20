from pydantic import BaseModel

class RecordingResponse(BaseModel):
    """Schema for returning recording data in API responses."""
    id: str
    data: str