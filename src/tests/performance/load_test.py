import subprocess

def run_load_test():
    try:
        # Run Locust using subprocess
        subprocess.run(['locust', '-f', 'src/tests/performance/locustfile.py', '--host', 'http://localhost:8000'], check=True)
    except subprocess.CalledProcessError as e:
        print(f'Error running load test: {e}')

if __name__ == '__main__':
    run_load_test()