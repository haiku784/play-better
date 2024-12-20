from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

# Initialize the FastAPI app
app = FastAPI()

# Sample model to represent gear
class Gear(BaseModel):
    name: str
    type: str
    description: str

# Sample user gameplay style model
class UserGameplayStyle(BaseModel):
    playstyle: str

# Sample gear recommendations based on playstyle
gear_data = {
    'aggressive': [
        Gear(name='Sword of Fury', type='Weapon', description='A sword that deals massive damage'),
        Gear(name='Shield of Valor', type='Armor', description='Protects against heavy attacks')
    ],
    'defensive': [
        Gear(name='Staff of Healing', type='Accessory', description='Heals the user and allies'),
        Gear(name='Armor of Resilience', type='Armor', description='Increases defense against all attacks')
    ]
}

@app.post('/recommend_gear/', response_model=List[Gear])
def get_gear_recommendations(user_style: UserGameplayStyle):
    """Returns gear recommendations based on user gameplay style."""
    recommendations = gear_data.get(user_style.playstyle)
    if recommendations:
        return recommendations
    else:
        raise HTTPException(status_code=404, detail='No recommendations found for this playstyle')
