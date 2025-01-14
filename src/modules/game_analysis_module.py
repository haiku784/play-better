import asyncio
from llama import Llama
from models import AnalysisResult

class GameAnalysisModule:
    def __init__(self):
        self.llama_model = Llama()

    async def analyze_gameplay(self, footage_path):
        """Analyze recorded gameplay footage and return insights and suggestions."""
        analysis_result = await self._process_footage(footage_path)
        return analysis_result

    async def _process_footage(self, footage_path):
        """Process the footage asynchronously using Llama model."""
        insights = await self.llama_model.analyze(footage_path)
        return self._generate_analysis_result(insights)

    def _generate_analysis_result(self, insights):
        """Generate a structured analysis result from the insights provided by Llama."""
        result = AnalysisResult(
            key_moments=insights['key_moments'],
            suggestions=insights['suggestions'],
            performance_metrics=insights['performance_metrics']
        )
        return result
