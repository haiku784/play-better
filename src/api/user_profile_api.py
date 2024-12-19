from fastapi import FastAPI, HTTPException
from .validators.user_profile_validation import UserProfile

app = FastAPI()

@app.post('/create_user_profile/')
async def create_user_profile(user_profile: UserProfile):
    validated_data = UserProfile.validate_user_profile(user_profile)
    # Logic to save validated user profile to database goes here
    return {'message': 'User profile created successfully', 'data': validated_data}