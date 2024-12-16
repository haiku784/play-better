from fastapi import FastAPI, HTTPException
import httpx

app = FastAPI()

# Define the URL for the game statistics API
API_URL = 'https://api.gameservice.com/v1/stats'

@app.get('/api/game-stats/{player_id}')
async def get_game_stats(player_id: str):
    """
    Fetches game statistics for a given player using the game API.
    
    Args:
        player_id (str): The unique identifier for the player.
    
    Returns:
        dict: Player game statistics if found.
    Raises:
        HTTPException: If player not found or API call fails.
    """
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f'{API_URL}/{player_id}')
            response.raise_for_status()  # Raises an error for bad responses
            return response.json()  # Return the JSON response containing player stats
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail="Player not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error retrieving data from API")

# Additional endpoints or functionalities can be defined below based on requirements.