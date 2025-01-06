# Rapid Recovery Documentation Module
# This module provides recovery strategies and procedures for service disruptions.

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

# Initialize the FastAPI router
router = APIRouter()

# Data model for recovery strategy
class RecoveryStrategy(BaseModel):
    strategy_name: str
    description: str
    steps: list

# In-memory storage for recovery strategies
recovery_strategies = []

@router.post("/recovery-strategy/", response_model=RecoveryStrategy)
async def create_recovery_strategy(strategy: RecoveryStrategy):
    """Create a new recovery strategy and store it in memory."""
    recovery_strategies.append(strategy)
    return strategy

@router.get("/recovery-strategy/", response_model=list[RecoveryStrategy])
async def get_recovery_strategies():
    """Retrieve all stored recovery strategies."""
    return recovery_strategies

@router.get("/recovery-strategy/{strategy_name}", response_model=RecoveryStrategy)
async def get_recovery_strategy(strategy_name: str):
    """Retrieve a single recovery strategy by its name."""
    for strategy in recovery_strategies:
        if strategy.strategy_name == strategy_name:
            return strategy
    raise HTTPException(status_code=404, detail="Strategy not found")

@router.delete("/recovery-strategy/{strategy_name}")
async def delete_recovery_strategy(strategy_name: str):
    """Delete a recovery strategy by its name."""
    global recovery_strategies
    recovery_strategies = [s for s in recovery_strategies if s.strategy_name != strategy_name]
    return {"message": "Strategy deleted successfully."}