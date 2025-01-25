from fastapi import HTTPException
from typing import Dict, Any

class MatchDataRetrieval:
    @staticmethod
    def get_match_data(match_id: str) -> Dict[str, Any]:
        """Fetches match data based on the provided match ID."""
        # Simulate retrieval from a database
        match_data = database.get(match_id)
        if match_data:
            return {'matchData': match_data, 'error': None}
        else:
            raise HTTPException(status_code=404, detail='Match not found')
