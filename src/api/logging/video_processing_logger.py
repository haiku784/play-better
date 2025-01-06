import logging

class VideoProcessingLogger:
    """Logger class for video processing tasks."""

    def __init__(self, name):
        # Setting up the logger with a specific name
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.DEBUG)

        # Create console handler for logging to console
        ch = logging.StreamHandler()
        ch.setLevel(logging.DEBUG)

        # Create formatter and add it to the console handler
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
        ch.setFormatter(formatter)

        # Add the console handler to the logger
        self.logger.addHandler(ch)

    def debug(self, message):
        """Log a debug message"""
        self.logger.debug(message)

    def info(self, message):
        """Log an info message"""
        self.logger.info(message)

    def warning(self, message):
        """Log a warning message"""
        self.logger.warning(message)

    def error(self, message):
        """Log an error message"""
        self.logger.error(message)

    def critical(self, message):
        """Log a critical message"""
        self.logger.critical(message)