class VideoConversionModule:
    def convert_video(self, video_data: bytes, format: str) -> dict:
        try:
            # Here should be the implementation of the conversion logic
            converted_video_data = self._convert(video_data, format)
            return {'convertedVideoData': converted_video_data, 'errorMessage': None}
        except Exception as e:
            return {'convertedVideoData': None, 'errorMessage': str(e)}

    def _convert(self, video_data: bytes, format: str) -> bytes:
        # A placeholder for actual conversion logic
        return video_data  # This should return converted video data