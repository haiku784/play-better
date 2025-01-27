class UserProfile:
    def __init__(self, user_id: str, preferences: dict, feedback_history: Optional[List[float]] = None):
        self.user_id = user_id
        self.preferences = preferences
        self.feedback_history = feedback_history or []

    def fetch_user_profile(user_id: str):
        # Mock database call - in reality, you would fetch from a database
        mock_database = {
            'user1': {'preferences': {'game_types': ['FPS', 'RPG'], 'brands': ['BrandX', 'BrandY'], 'price_range': [50, 200]}, 'feedback_history': []},
        }
        profile = mock_database.get(user_id)
        if profile:
            return UserProfile(user_id, profile['preferences'], profile['feedback_history'])
        else:
            raise ValueError("User not found")