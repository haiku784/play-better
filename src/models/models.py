from pydantic import BaseModel, Field
from typing import Optional, Dict, Any

class PlaybackMetadata(BaseModel):
    session_id: str = Field(..., description="Unique identifier for the recorded session")
    playback_speed: float = Field(..., description="Playback speed of the recorded session")
    user_preferences: Dict[str, Any] = Field(..., description="User-defined playback preferences")
    created_at: str = Field(..., description="Timestamp when the metadata was created")
    updated_at: str = Field(..., description="Timestamp when the metadata was last updated")

# This schema will be used to validate the playback metadata when saving to the database.