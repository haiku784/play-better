import requests
from caching_manager import CachingManager

class LlamaAPIClient:
    def __init__(self, api_key):
        self.api_key = api_key
        self.cache = CachingManager(expiration_time=300)  # Cache for 5 minutes

    def call_api(self, prompt):
        """
        Calls the Llama API with the provided prompt. Caches the response.
        :param prompt: The prompt to send to the Llama API.
        :return: The API response.
        """
        cache_key = f'llama_{prompt}'
        cached_response = self.cache.get(cache_key)
        if cached_response:
            print('Returning cached response.')
            return cached_response

        response = requests.post(
            'https://api.llama.com/v1/engines/gpt-3.5-turbo/completions',
            headers={'Authorization': f'Bearer {self.api_key}'},
            json={'prompt': prompt, 'max_tokens': 150}
        )
        if response.status_code == 200:
            result = response.json()['choices'][0]['text']
            self.cache.set(cache_key, result)  # Cache the result
            return result
        else:
            raise Exception(f'API call failed: {response.text}')
