from sqlalchemy.ext.asyncio import AsyncSession
from typing import Any
import asyncio

class VideoProcessingService:
    @staticmethod
    async def process_video(video_id: str, session: AsyncSession):
        """
        Asynchronously process the video.
        Args:
            video_id (str): The ID of the video to process.
            session (AsyncSession): The SQLAlchemy async session.
        """
        # Simulating video processing for demonstration
        await asyncio.sleep(5)  # Simulate a long-running process
        print(f"Video {video_id} processed successfully.")
