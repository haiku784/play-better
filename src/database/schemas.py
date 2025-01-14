from pydantic import BaseModel, conint, constr

class FeedbackSchema(BaseModel):
    user_id: str
    gear_id: str
    rating: conint(ge=1, le=5)
    comments: constr(max_length=500)

    class Config:
        schema_extra = {
            "example": {
                "user_id": "user123",
                "gear_id": "gear456",
                "rating": 5,
                "comments": "This gear is amazing!"
            }
        }
