from fastapi import APIRouter

router = APIRouter()

@router.get("/user_performance/{user_id}")
async def get_user_performance(user_id: int):
    # Simulated performance data retrieval
    performance_data = {
        "user_id": user_id,
        "average_score": 85,
        "win_rate": 0.75
    }  # This would be replaced with actual data retrieval logic
    return performance_data