from fastapi import APIRouter
from .algorithm import Algorithm

router = APIRouter()

@router.post("/algorithms/", response_model=Algorithm)
async def create_algorithm(algorithm: Algorithm):
    # Logic to create an algorithm in the system
    return algorithm