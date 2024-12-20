from pydantic import BaseModel, conlist, constr

class RecommendationSchema(BaseModel):
    recommendations: conlist(constr(min_length=1))
    user_id: str
    timestamp: str
    
    class Config:
        schema_extra = {
            "example": {
                "recommendations": ["Gear A", "Gear B"],
                "user_id": "12345",
                "timestamp": "2023-10-09T12:34:56Z"
            }
        }