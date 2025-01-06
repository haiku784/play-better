from pydantic import BaseModel
from typing import List, Optional

class GameplayEvent(BaseModel):
    event_type: str  # Type of event (e.g., 'click', 'keypress')
    timestamp: float  # Time when the event occurred
    details: dict  # Additional details about the event

class GameplaySession(BaseModel):
    session_id: str  # Unique identifier for the gameplay session
    user_id: str  # Identifier for the user who played
    start_time: float  # Session start time
    end_time: float  # Session end time
    events: List[GameplayEvent]  # List of gameplay events
    score: Optional[int]  # Optional score achieved during the session

    def duration(self) -> float:
        """Calculates the duration of the gameplay session."""
        return self.end_time - self.start_time

    def add_event(self, event: GameplayEvent):
        """Adds a new event to the gameplay session."""
        self.events.append(event)
