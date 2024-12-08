from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel

# Database models
class UserPreference(BaseModel):
    user_id: int
    preferences: dict

# Database session dependency
def get_db():
    # Logic to create and return a database session
    pass

# FastAPI instance
app = FastAPI()

# Save user preferences endpoint
@app.post('/preferences/')
async def save_user_preferences(preference: UserPreference, db: Session = Depends(get_db)):
    try:
        # Logic to save preferences in the database
        # db.add(new_preference)
        # db.commit()
        # db.refresh(new_preference)
        return {'message': 'Preferences saved successfully.'}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Optionally add a retrieval endpoint
@app.get('/preferences/{user_id}')
async def get_user_preferences(user_id: int, db: Session = Depends(get_db)):
    try:
        # Logic to retrieve preferences from the database
        # preference = db.query(UserPreference).filter(UserPreference.user_id == user_id).first()
        return preference
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
