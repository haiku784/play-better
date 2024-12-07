import random

class GearRecommendation:
    def __init__(self, user_preferences):
        self.user_preferences = user_preferences
        self.gear_database = self.load_gear_database()

    def load_gear_database(self):
        # Simulating a gear database load
        return [
            {'name': 'Sword', 'style': 'melee', 'rating': 5},
            {'name': 'Bow', 'style': 'ranged', 'rating': 4},
            {'name': 'Staff', 'style': 'magic', 'rating': 3},
            {'name': 'Shield', 'style': 'defense', 'rating': 5},
        ]

    def recommend_gear(self):
        recommendations = []
        for gear in self.gear_database:
            if gear['style'] == self.user_preferences['preferred_style']:
                recommendations.append(gear)
        return sorted(recommendations, key=lambda x: x['rating'], reverse=True)

# Example usage:
user_preferences = {'preferred_style': 'ranged'}
engine = GearRecommendation(user_preferences)
print(engine.recommend_gear())