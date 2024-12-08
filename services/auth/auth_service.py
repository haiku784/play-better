class AuthService:
    def __init__(self, user_service):
        self.user_service = user_service
        self.logged_in_users = set()  # Keep track of logged-in users

    def login(self, email):
        user = next((u for u in self.user_service.users if u.email == email), None)
        if user:
            self.logged_in_users.add(email)
            return user
        else:
            raise ValueError('User not found')

    def logout(self, email):
        self.logged_in_users.discard(email)  # Remove user from logged in set
        return email + ' has logged out.'