from mongoengine import Document, StringField, ListField, connect

connect('game_analysis')

class UserProfile(Document):
    username = StringField(required=True, unique=True)
    email = StringField(required=True, unique=True)
    preferences = ListField(StringField())

if __name__ == '__main__':
    user = UserProfile(username='player1', email='player1@example.com', preferences=['aggressive', 'sniper'])
    user.save()