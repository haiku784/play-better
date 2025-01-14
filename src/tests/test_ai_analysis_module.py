import pytest
from ai.ai_analysis_module import AIAnalysis

@pytest.fixture
def ai_analysis():
    return AIAnalysis(mongo_uri='YOUR_MONGODB_URI')

@pytest.mark.asyncio
async def test_analyze_gameplay(ai_analysis):
    result = await ai_analysis.analyze_gameplay('test_video_url')
    assert result is not None

@pytest.mark.asyncio
async def test_store_analysis_results(ai_analysis):
    await ai_analysis.store_analysis_results({'key': 'value'}, {'key': 'value'})
    result = await ai_analysis.collection.find_one({'key': 'value'})
    assert result is not None
