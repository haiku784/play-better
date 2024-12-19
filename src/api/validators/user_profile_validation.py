from pydantic import BaseModel, EmailStr, constr
from fastapi import HTTPException, status

class UserProfile(BaseModel):
    username: constr(min_length=3, max_length=30)
    email: EmailStr
    password: constr(min_length=8, regex='(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])')  # Must contain uppercase, digit, special char

    @classmethod
    def validate_user_profile(cls, user_profile):
        try:
            # Validate user profile fields
            user_profile_dict = user_profile.dict()
            return user_profile_dict
        except ValueError as e:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=str(e)
            )