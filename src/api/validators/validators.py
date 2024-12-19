from pydantic import BaseModel, validator, ValidationError

class UserPreference(BaseModel):
    username: str
    preference: str

    @validator('username')
    def username_must_not_be_empty(cls, v):
        if not v:
            raise ValueError('Username must not be empty')
        return v

    @validator('preference')
    def preference_must_be_valid(cls, v):
        valid_preferences = ['option1', 'option2', 'option3']
        if v not in valid_preferences:
            raise ValueError(f'Invalid preference. Valid options are: {valid_preferences}')
        return v

