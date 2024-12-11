import asyncio
import httpx
import time

# Define the URL of the FastAPI endpoint to test
API_URL = 'http://localhost:8000/your-endpoint'

# Function to simulate an API request
async def fetch(client, url):
    response = await client.get(url)
    return response.status_code, response.elapsed.total_seconds()

# Main function to perform load testing
async def load_test(concurrent_requests):
    async with httpx.AsyncClient() as client:
        tasks = [fetch(client, API_URL) for _ in range(concurrent_requests)]
        results = await asyncio.gather(*tasks)
        return results

# Function to execute the load test
def run_load_test():
    concurrent_requests = 10  # Number of concurrent requests
    print(f'Starting load test with {concurrent_requests} concurrent requests...')
    start_time = time.time()
    results = asyncio.run(load_test(concurrent_requests))
    end_time = time.time()

    # Print out the results
    for status_code, response_time in results:
        print(f'Response Code: {status_code}, Response Time: {response_time:.2f} seconds')

    print(f'Total time for load test: {end_time - start_time:.2f} seconds')

if __name__ == '__main__':
    run_load_test()