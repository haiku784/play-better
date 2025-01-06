import time
import requests
from typing import Callable, Any

class APIRetry:
    def __init__(self, max_attempts: int = 3, backoff_factor: float = 0.5):
        """Initialize the retry mechanism.
        :param max_attempts: Maximum number of attempts to make.
        :param backoff_factor: Factor by which to increase wait time between attempts.
        """
        self.max_attempts = max_attempts
        self.backoff_factor = backoff_factor

    def retry(self, api_call: Callable[[], Any]) -> Any:
        """Attempt to call the provided API function with retries on failure.
        :param api_call: A callable that represents the API call.
        :return: The result of the API call.
        """
        for attempt in range(self.max_attempts):
            try:
                response = api_call()
                response.raise_for_status()  # Raise an error for bad responses
                return response
            except requests.RequestException as e:
                if attempt < self.max_attempts - 1:
                    wait_time = self.backoff_factor * (2 ** attempt)
                    print(f"Attempt {attempt + 1} failed: {e}. Retrying in {wait_time} seconds...")
                    time.sleep(wait_time)
                else:
                    print(f"Final attempt failed: {e}")
                    raise  # Reraise the last exception
