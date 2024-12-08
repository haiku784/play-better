import json

class RecommendationSystem:
    def __init__(self, user_hardware, user_preferences):
        self.user_hardware = user_hardware
        self.user_preferences = user_preferences
        self.recommendations = {}

    def analyze_hardware(self):
        # Basic analysis based on hardware capabilities
        if self.user_hardware['gpu'] < 2:
            self.recommendations['graphic_quality'] = 'Low'
        elif self.user_hardware['gpu'] < 4:
            self.recommendations['graphic_quality'] = 'Medium'
        else:
            self.recommendations['graphic_quality'] = 'High'

    def match_preferences(self):
        # Match recommendations based on user preferences
        if 'performance' in self.user_preferences:
            self.recommendations['framerate_limit'] = '60 FPS'
        if 'visuals' in self.user_preferences:
            self.recommendations['graphic_quality'] = 'High' if 'High' in self.recommendations.values() else self.recommendations['graphic_quality']

    def generate_recommendations(self):
        self.analyze_hardware()
        self.match_preferences()
        return self.recommendations

# Sample user settings and hardware
user_hardware = {'gpu': 3, 'cpu': 4}
user_preferences = ['performance', 'visuals']

# Creating an instance of RecommendationSystem and generating recommendations
recommendation_system = RecommendationSystem(user_hardware, user_preferences)
print(json.dumps(recommendation_system.generate_recommendations(), indent=2))