from fastapi import HTTPException, status
from pydantic import BaseModel, EmailStr, constr

class UserRegistration(BaseModel):
    username: constr(min_length=3, max_length=30)  # Username must be between 3 and 30 characters
    email: EmailStr  # Validate email format
    password: constr(min_length=8, max_length=128)  # Password must be 8-128 characters

def validate_registration(user: UserRegistration) -> None:
    if not user.username.isalnum():  # Username must only contain alphanumeric characters
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username must be alphanumeric."
        )