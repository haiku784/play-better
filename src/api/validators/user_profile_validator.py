from pydantic import BaseModel, EmailStr, constr

class UserProfileValidator(BaseModel):
    username: constr(min_length=3, max_length=50)
    email: EmailStr
    full_name: str = ''
    bio: str = ''

    class Config:
        orm_mode = True

    @classmethod
    def validate_username(cls, username):
        if not username.isalnum():
            raise ValueError('Username must be alphanumeric')
        return username
