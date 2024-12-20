import unittest
import subprocess
from unittest.mock import patch

class TestDeployAIEngine(unittest.TestCase):

    @patch('subprocess.run')
    def test_build_docker_image(self, mock_run):
        build_docker_image()
        mock_run.assert_called_once_with(["docker", "build", "-t", "my-ai-engine", "src/ai_engine"])

    @patch('subprocess.run')
    def test_deploy_to_cloud(self, mock_run):
        deploy_to_cloud()
        mock_run.assert_called_once_with(["docker", "run", "-d", "--name", "my-ai-engine", "my-ai-engine"])

if __name__ == '__main__':
    unittest.main()