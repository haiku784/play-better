from mongoengine import Document, StringField, IntField"n
class User(Document):
    username = StringField(required=True)
    email = StringField(required=True)
    age = IntField()

class Post(Document):
    title = StringField(required=True)
    content = StringField(required=True)
    user = StringField(required=True)