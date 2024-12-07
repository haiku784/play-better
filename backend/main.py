from fastapi import FastAPI
from .league_of_legends.lol_integration import fetch_league_data
from .dota_2.dota_integration import fetch_dota_data

app = FastAPI()

@app.get('/lol/summoner/{summoner_name}')
async def get_league_summoner(summoner_name: str):
    '''
    Retrieves League of Legends summoner data.
    :param summoner_name: The name of the summoner.
    :return: Summoner data in JSON format.
    '''
    return await fetch_league_data(summoner_name)

@app.get('/dota/account/{account_id}')
async def get_dota_account(account_id: int):
    '''
    Retrieves Dota 2 match data for a given account ID.
    :param account_id: The account ID.
    :return: Match data in JSON format.
    '''
    return await fetch_dota_data(account_id)

# To run the server: uvicorn main:app --reload
