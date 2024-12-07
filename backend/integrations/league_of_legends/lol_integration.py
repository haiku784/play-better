import httpx

# Define the base URL for the League of Legends API
BASE_URL = 'https://api.riotgames.com/lol/'

async def fetch_league_data(summoner_name):
    '''
    Fetches League of Legends data for a given summoner name.
    :param summoner_name: The name of the summoner.
    :return: Summoner data or an error message.
    '''
    async with httpx.AsyncClient() as client:
        response = await client.get(BASE_URL + 'summoner/v4/summoners/by-name/' + summoner_name)
        if response.status_code == 200:
            return response.json()
        else:
            return {'error': 'Unable to fetch data'}

# Example usage: 
# data = await fetch_league_data('SummonerName')
# print(data)
