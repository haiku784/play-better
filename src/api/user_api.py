from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class UserLogin(BaseModel):
    username: str
    password: str

@router.post("/login")
async def login_user(user: UserLogin):
    # Check if the user exists and passwords match
    found_user = next((u for u in users_db if u.username == user.username), None)
    if not found_user or found_user.password != user.password:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {"message": "Login successful"}
