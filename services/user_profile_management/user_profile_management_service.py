from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel, HttpUrl

app = FastAPI()

# Data model for user profile input
class UserProfile(BaseModel):
    userId: str
    preferredGames: list[str]
    gamingStyles: list[str]
    profilePicture: HttpUrl = None
    bio: str = None

# Data model for profile creation response
class ProfileCreationResponse(BaseModel):
    status: str
    message: str
    profileId: str

# In-memory storage for user profiles (could be replaced with a database)
user_profiles = {}  # Dictionary to hold user profiles

@app.post('/api/user/profile', response_model=ProfileCreationResponse)
async def create_user_profile(profile: UserProfile):
    # Check if user already exists
    if profile.userId in user_profiles:
        raise HTTPException(status_code=400, detail="User profile already exists.")
    # Create user profile and store it
    user_profiles[profile.userId] = profile.dict()
    return ProfileCreationResponse(status="success", message="Profile created successfully.", profileId=profile.userId)

# Data model for profile retrieval response
class UserProfileData(BaseModel):
    status: str
    profileData: dict

@app.get('/api/user/profile/{userId}', response_model=UserProfileData)
async def get_user_profile(userId: str):
    # Retrieve user profile
    profile_data = user_profiles.get(userId)
    if not profile_data:
        raise HTTPException(status_code=404, detail="User profile not found.")
    return UserProfileData(status="success", profileData=profile_data)

# Data model for recommendations retrieval response
class RecommendationsResponse(BaseModel):
    status: str
    recommendations: list[str]

@app.get('/api/user/profile/recommendations', response_model=RecommendationsResponse)
async def get_recommendations(userId: str):
    # Placeholder for recommendation logic; should be replaced with actual logic
    if userId not in user_profiles:
        raise HTTPException(status_code=404, detail="User profile not found.")
    recommendations = ["Gear A", "Gear B", "Gear C"]  # Example recommendations
    return RecommendationsResponse(status="success", recommendations=recommendations)