import os
import subprocess

# Configuration settings for the deployment
CLOUD_PROVIDER = "AWS"
DEPLOYMENT_REGION = "us-west-1"
AI_ENGINE_PATH = "src/ai_engine"
DOCKER_IMAGE = "my-ai-engine"

# Function to build the Docker image

def build_docker_image():
    print("Building Docker image...")
    subprocess.run(["docker", "build", "-t", DOCKER_IMAGE, AI_ENGINE_PATH])

# Function to deploy the Docker image to the cloud

def deploy_to_cloud():
    print(f"Deploying {DOCKER_IMAGE} to {CLOUD_PROVIDER} in region {DEPLOYMENT_REGION}...")
    subprocess.run(["docker", "run", "-d", "--name", DOCKER_IMAGE, DOCKER_IMAGE])

# Main function to execute deployment steps

def main():
    build_docker_image()
    deploy_to_cloud()

if __name__ == "__main__":
    main()