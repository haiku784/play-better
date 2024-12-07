import httpx

# Define the base URL for the Dota 2 API
BASE_URL = 'https://api.steampowered.com/IDOTA2Match_570/'

async def fetch_dota_data(account_id):
    '''
    Fetches Dota 2 data for a given account_id.
    :param account_id: The account ID of the Dota 2 player.
    :return: Player match data or an error message.
    '''
    async with httpx.AsyncClient() as client:
        response = await client.get(BASE_URL + 'GetMatchHistory/v1/?account_id=' + str(account_id))
        if response.status_code == 200:
            return response.json()
        else:
            return {'error': 'Unable to fetch data'}

# Example usage: 
# data = await fetch_dota_data(123456789)
# print(data)
