import json
import os

def parse_results(file_path):
    # Parses JSON performance test results
    if not os.path.exists(file_path):
        print(f'File not found: {file_path}')
        return
    with open(file_path, 'r') as file:
        results = json.load(file)
        # Process and print results
        print(f'Total Requests: {results['total']}')
        print(f'Average Response Time: {results['avg_response_time']} ms')

if __name__ == '__main__':
    parse_results('path/to/results.json')  # Update with actual results file path