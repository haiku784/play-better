from fastapi import HTTPException
from typing import Dict, Any

class TrendGraphGeneration:
    @staticmethod
    def generate_trend_graph(trend_data: list, visualization_type: str = 'line') -> Dict[str, Any]:
        """Creates a trend graph based on historical data for the requested category."""
        try:
            trend_graph_url = trend_graph_library.create_graph(trend_data, visualization_type)
            return {'trendGraphUrl': trend_graph_url, 'error': None}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
