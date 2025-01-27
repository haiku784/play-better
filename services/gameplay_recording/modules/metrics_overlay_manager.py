class MetricsOverlayManager:
    def set_fps(self, stream_id: str, fps_value: int):
        """
        Sets the FPS value to be displayed on the video stream.
        :param stream_id: The unique identifier for the video stream.
        :param fps_value: The frames per second value to display.
        :return: A dictionary indicating the success status and message.
        """
        # Set FPS logic here
        status = "success"
        message = f"FPS set to {fps_value} for stream {stream_id}."
        return {'status': status, 'message': message}

    def set_latency(self, stream_id: str, latency_value: int):
        """
        Sets the latency value to be displayed on the video stream.
        :param stream_id: The unique identifier for the video stream.
        :param latency_value: The latency value to display in milliseconds.
        :return: A dictionary indicating the success status and message.
        """
        # Set latency logic here
        status = "success"
        message = f"Latency set to {latency_value} ms for stream {stream_id}."
        return {'status': status, 'message': message}