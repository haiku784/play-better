from fastapi import HTTPException
from typing import Dict, Any

class ChartGeneration:
    @staticmethod
    def generate_chart(data: list, visualization_type: str) -> Dict[str, Any]:
        """Creates a chart based on the input data and specified visualization type."""
        try:
            chart_url = chart_library.create_chart(data, visualization_type)
            return {'chartUrl': chart_url, 'error': None}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
