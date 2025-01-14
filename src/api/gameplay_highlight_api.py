from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

database = {}  # Mock database for demonstration purposes

class Highlight(BaseModel):
    user_id: str
    session_id: str
    highlight_id: str
    timestamp: str
    highlight_type: str
    video_segment_link: str

class HighlightsResponse(BaseModel):
    highlights: List[Highlight]

def validate_user(user_id: str):
    # Mock user validation logic
    if user_id not in database:
        raise HTTPException(status_code=403, detail="User does not have permission")

@app.get("/highlights/{user_id}/{session_id}", response_model=HighlightsResponse)
async def get_highlights(user_id: str, session_id: str, user: str = Depends(validate_user)):
    highlights = [h for h in database.get(user_id, []) if h.session_id == session_id]
    if not highlights:
        raise HTTPException(status_code=404, detail="No highlights found")
    return HighlightsResponse(highlights=highlights)