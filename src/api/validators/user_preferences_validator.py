from pydantic import BaseModel, Field, validator

class UserPreferences(BaseModel):
    # Define the fields for user preferences
    preference_key: str = Field(..., description="The key of the preference to update")
    preference_value: str = Field(..., description="The value of the preference to update")

    @validator('preference_key')
    def key_must_not_be_empty(cls, v):
        if not v:
            raise ValueError('Preference key must not be empty')
        return v

    @validator('preference_value')
    def value_must_not_be_empty(cls, v):
        if not v:
            raise ValueError('Preference value must not be empty')
        return v

    @validator('preference_value')
    def value_must_be_valid_type(cls, v):
        # Example validation for valid types (assuming it should be a string)
        if not isinstance(v, str):
            raise TypeError('Preference value must be a string')
        return v

    class Config:
        schema_extra = {
            "example": {
                "preference_key": "theme",
                "preference_value": "dark"
            }
        }