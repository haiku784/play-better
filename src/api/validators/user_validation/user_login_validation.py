from fastapi import HTTPException, status
from pydantic import BaseModel, constr

class UserLogin(BaseModel):
    email: str  # Email as string since it will be validated in the API logic
    password: constr(min_length=8)  # Password must be at least 8 characters long

def validate_login(user: UserLogin) -> None:
    if not user.email:  # Ensure email is provided
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email must be provided."
        )
    # Additional email format validation could be added here if necessary
