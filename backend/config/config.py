from flask import Flask

class Config:
    DEBUG = True
    TESTING = False
    THREADS_PER_PAGE = 2
    CSRF_ENABLED = True
    SECRET_KEY = 'your_secret_key'

# Create Flask app instance
app = Flask(__name__)
app.config.from_object(Config)
