from mongoengine import Document, StringField, DateTimeField, DictField, IntField
import datetime

class GameplaySession(Document):
    """
    MongoDB schema for storing recorded gameplay sessions.
    """
    user_id = StringField(required=True, description="Unique identifier for the user")
    session_id = StringField(required=True, description="Unique identifier for the gameplay session")
    session_data = DictField(required=True, description="Data related to the gameplay session")
    timestamp = DateTimeField(default=datetime.datetime.utcnow, description="Timestamp of when the session was recorded")
    metadata = DictField(required=True, description="Metadata including game details")

    meta = {
        'collection': 'gameplay_sessions',
        'indexes': [
            'user_id',
            'session_id'
        ]
    }  
