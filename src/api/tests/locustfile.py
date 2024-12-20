from locust import HttpUser, between, task

class VideoUploadUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def upload_video(self):
        self.client.post('/video-upload', files={'file': open('test_video.mp4', 'rb')})
