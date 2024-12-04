from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class UserPreferences(BaseModel):
    play_style: str
    favorite_weapons: list

@app.post('/recommend_gear/')
def recommend_gear(preferences: UserPreferences):
    gear_list = []
    if preferences.play_style == 'aggressive':
        gear_list.append('High Damage Gear')
    elif preferences.play_style == 'defensive':
        gear_list.append('Armor Gear')
    gear_list.extend(preferences.favorite_weapons)
    return {'recommended_gear': gear_list}