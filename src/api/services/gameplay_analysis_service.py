from sqlalchemy.orm import Session
from .models import GameplayAnalysis

class GameplayAnalysisService:
    def __init__(self, db: Session):
        self.db = db

    def create_analysis(self, analysis_data: dict) -> GameplayAnalysis:
        new_analysis = GameplayAnalysis(**analysis_data)
        self.db.add(new_analysis)
        self.db.commit()
        self.db.refresh(new_analysis)
        return new_analysis

    def get_analysis(self, analysis_id: int) -> GameplayAnalysis:
        return self.db.query(GameplayAnalysis).filter(GameplayAnalysis.id == analysis_id).first()

    def get_all_analysis(self) -> list:
        return self.db.query(GameplayAnalysis).all()