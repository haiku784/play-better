from typing import List
from ..models.GameplaySession import GameplaySession

class GameplayAnalysisService:
    def __init__(self):
        self.sessions = []  # Placeholder for session storage (e.g., a database)

    def get_session(self, session_id: str) -> GameplaySession:
        for session in self.sessions:
            if session.id == session_id:
                return session
        return None

    def get_all_sessions(self) -> List[GameplaySession]:
        return self.sessions

    def create_session(self, session: GameplaySession) -> GameplaySession:
        self.sessions.append(session)
        return session

    def delete_session(self, session_id: str) -> bool:
        for i, session in enumerate(self.sessions):
            if session.id == session_id:
                del self.sessions[i]
                return True
        return False