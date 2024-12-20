from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.gameplay_analysis_service import GameplayAnalysisService
from ..schemas import GameplayAnalysisSchema

router = APIRouter()

@router.post('/analysis/', response_model=GameplayAnalysisSchema)
async def create_analysis(analysis_data: GameplayAnalysisSchema, db: Session = Depends(get_db)):
    service = GameplayAnalysisService(db)
    return service.create_analysis(analysis_data.dict())

@router.get('/analysis/{analysis_id}', response_model=GameplayAnalysisSchema)
async def read_analysis(analysis_id: int, db: Session = Depends(get_db)):
    service = GameplayAnalysisService(db)
    analysis = service.get_analysis(analysis_id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return analysis

@router.get('/analysis/', response_model=list[GameplayAnalysisSchema])
async def get_all_analysis(db: Session = Depends(get_db)):
    service = GameplayAnalysisService(db)
    return service.get_all_analysis()