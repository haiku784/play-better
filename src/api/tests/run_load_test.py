import os
import subprocess

if __name__ == '__main__':
    # Command to run locust in the terminal
    command = 'locust -f src/api/tests/load_tester.py --host=http://localhost:8000'
    os.system(command)
