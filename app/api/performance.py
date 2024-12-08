from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from models import UserPerformance, User
from database import get_db

app = FastAPI()

@app.get('/performance/{user_id}')
async def get_user_performance(user_id: int, db: Session = Depends(get_db)):
    # Validate user authentication (This would typically involve JWT token validation)
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail='User not found')
    
    # Fetch the performance data for the authenticated user
    performance_data = db.query(UserPerformance).filter(UserPerformance.user_id == user_id).all()
    if not performance_data:
        return {'message': 'No performance data available for this user'}
    
    # Returning the performance data in a structured format
    return performance_data
