from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Define a model for the user settings
class UserSettings(BaseModel):
    username: str
    preferences: dict

# Define a model for the optimization suggestions
class OptimizationSuggestion(BaseModel):
    suggestion: str
    reason: str

# Sample function to analyze user settings and generate suggestions
def generate_suggestions(settings: UserSettings) -> List[OptimizationSuggestion]:
    suggestions = []
    # Analyze user preferences and generate suggestions
    if "dark_mode" in settings.preferences and settings.preferences["dark_mode"]:
        suggestions.append(OptimizationSuggestion(suggestion="Consider adjusting your brightness settings.", reason="Dark mode is enabled, which may require brightness adjustments for optimal viewing.")).
    if "notifications" in settings.preferences and not settings.preferences["notifications"]:
        suggestions.append(OptimizationSuggestion(suggestion="Enable notifications for important updates.", reason="You have disabled notifications, which could cause you to miss important updates."))
    # Add more logic as necessary...
    return suggestions

@app.post("/optimize-settings/", response_model=List[OptimizationSuggestion])
async def optimize_user_settings(settings: UserSettings):
    return generate_suggestions(settings)