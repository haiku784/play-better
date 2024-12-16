class UserService:
    """
    This class implements the user service logic for managing user operations.
    """

    def __init__(self, user_repository):
        """
        Initializes the UserService with a user repository.
        :param user_repository: An instance of UserRepository to interact with user data.
        """
        self.user_repository = user_repository

    def create_user(self, username, password):
        """
        Create a new user with the specified username and password.
        :param username: The username of the new user.
        :param password: The password of the new user.
        :return: The created user object.
        """
        user = self.user_repository.add_user(username, password)
        return user

    def get_user(self, user_id):
        """
        Retrieve a user by their user ID.
        :param user_id: The ID of the user to retrieve.
        :return: The user object if found, else None.
        """
        user = self.user_repository.find_user_by_id(user_id)
        return user

    def delete_user(self, user_id):
        """
        Delete a user by their user ID.
        :param user_id: The ID of the user to delete.
        :return: True if the user was deleted, False otherwise.
        """
        return self.user_repository.remove_user(user_id)
