import os
import subprocess

def test_docker_build():
    # Run the docker build command
    result = subprocess.run(['docker', 'build', '-t', 'ai_engine_test', '.'], capture_output=True, text=True)
    assert result.returncode == 0, "Docker build failed!
Output: {}".format(result.stdout)


def test_docker_run():
    # Run the docker run command
    result = subprocess.run(['docker', 'run', '--rm', '-d', '-p', '8000:8000', 'ai_engine_test'], capture_output=True, text=True)
    assert result.returncode == 0, "Docker run failed!
Output: {}".format(result.stdout)
    # Clean up the container
    container_id = result.stdout.strip()
    subprocess.run(['docker', 'stop', container_id])
