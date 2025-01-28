from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class AcknowledgeRequest(BaseModel):
    userId: str
    feedbackId: str
    message: Optional[str] = None

class AcknowledgeResponse(BaseModel):
    status: str
    message: str

@app.post('/feedback/acknowledge', response_model=AcknowledgeResponse)
async def acknowledge_feedback(request: AcknowledgeRequest):
    """Acknowledges user feedback and returns a response.
    Args:
        request (AcknowledgeRequest): The acknowledgment request containing user and feedback IDs.
    Returns:
        AcknowledgeResponse: Response containing acknowledgment status and message.
    """  
    # Here you would integrate the logic to process the acknowledgment
    # For demonstration, we're assuming success.
    return AcknowledgeResponse(status='success', message='Feedback acknowledged successfully!')