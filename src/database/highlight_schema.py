from pydantic import BaseModel
from typing import Optional

class Highlight(BaseModel):
    user_id: str
    session_id: str
    highlight_id: Optional[str] = None
    timestamp: str
    highlight_type: str
    video_segment_link: str