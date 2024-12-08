class User:
    def __init__(self, username, email):
        self.username = username
        self.email = email

class UserService:
    def __init__(self):
        self.users = []

    def register_user(self, username, email):
        if self.is_email_unique(email):
            new_user = User(username, email)
            self.users.append(new_user)
            return new_user
        else:
            raise ValueError('Email already registered')

    def is_email_unique(self, email):
        return all(user.email != email for user in self.users)