from mongoengine import Document, StringField, IntField, DateTimeField
from datetime import datetime

class FeedbackModel(Document):
    user_id = StringField(required=True)
    gear_id = StringField(required=True)
    rating = IntField(required=True)
    comments = StringField(max_length=500)
    timestamp = DateTimeField(default=datetime.utcnow)
