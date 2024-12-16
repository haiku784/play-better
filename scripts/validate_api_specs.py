import json
import os

def validate_api_spec(spec_path):
    try:
        with open(spec_path, 'r') as file:
            spec = json.load(file)
            # Basic validation checks
            if 'openapi' in spec and 'paths' in spec:
                print(f'API specification {spec_path} is valid.')
            else:
                print(f'API specification {spec_path} is invalid: missing required fields.')
    except json.JSONDecodeError:
        print(f'Error decoding JSON from {spec_path}.')
    except Exception as e:
        print(f'An error occurred: {e}')

# Validate all API specifications in the directory
def validate_all_api_specs(directory):
    for filename in os.listdir(directory):
        if filename.endswith('.json'):
            validate_api_spec(os.path.join(directory, filename))

if __name__ == '__main__':
    validate_all_api_specs('api/specifications/')