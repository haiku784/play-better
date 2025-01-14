from fastapi import APIRouter, Depends
from .highlight_analysis import HighlightAnalysis
from .highlight_schema import Highlight

router = APIRouter()

highlight_analysis = HighlightAnalysis(db_url='mongodb://localhost:27017')

@router.post('/highlights/save')
def save_highlight(highlight: Highlight):
    highlight_analysis.save_highlight(highlight.user_id, highlight.session_id, highlight.dict())
    return {'status': 'Highlight saved successfully'}

@router.get('/highlights/{user_id}/{session_id}')
def get_highlights(user_id: str, session_id: str):
    highlights = highlight_analysis.retrieve_highlights(user_id, session_id)
    return {'highlights': highlights}