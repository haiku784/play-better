from mongoengine import Document, StringField, FloatField, DateTimeField, DateTime
from datetime import datetime

class UserReviewModel(Document):
    user_id = StringField(required=True)
    gear_option_id = StringField(required=True)
    review_text = StringField(required=True)
    rating = FloatField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)  # Set timestamp on creation