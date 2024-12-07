class GearRecommendation:
    def __init__(self, user_data):
        self.user_data = user_data

    def recommend_gear(self):
        # Placeholder for gear recommendation logic based on user data
        recommendations = ['Gear A', 'Gear B']
        return recommendations

# Example usage
user_data = {'preferences': 'FPS games'}
engine = GearRecommendation(user_data)
print(engine.recommend_gear())