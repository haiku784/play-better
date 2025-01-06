from fastapi import APIRouter
from ..controllers.GameplaySessionController import router as GameplaySessionController

router = APIRouter()

router.include_router(GameplaySessionController, prefix="/gameplay_sessions", tags=["gameplay_sessions"])