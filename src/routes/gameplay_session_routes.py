from fastapi import APIRouter
from src.controllers.gameplay_session_controller import router as gameplay_session_router

router = APIRouter()

# Include the gameplay session routes
router.include_router(gameplay_session_router, prefix='/sessions', tags=['gameplay'])
