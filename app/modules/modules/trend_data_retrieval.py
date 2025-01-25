from fastapi import HTTPException
from typing import Dict, Any

class TrendDataRetrieval:
    @staticmethod
    def get_trend_data(category: str, filter_options: Dict[str, Any] = None) -> Dict[str, Any]:
        """Fetches historical data for calculating trends based on specified parameters."""
        trend_data = database.get_trend_data(category, filter_options)
        if trend_data:
            return {'trendData': trend_data, 'error': None}
        else:
            raise HTTPException(status_code=404, detail='Trend data not found')
