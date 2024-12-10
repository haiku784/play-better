import random

class RecommendationEngine:
    def __init__(self, user_metrics):
        """
        Initializes the recommendation engine with user performance metrics.
        :param user_metrics: dict containing user performance metrics
        """
        self.user_metrics = user_metrics
        self.drills = self.load_drills()

    def load_drills(self):
        """
        Loads available drills from a predefined list.
        :return: list of drills
        """
        return [
            {'name': 'Drill A', 'focus': 'speed', 'difficulty': 1},
            {'name': 'Drill B', 'focus': 'accuracy', 'difficulty': 2},
            {'name': 'Drill C', 'focus': 'endurance', 'difficulty': 3},
            {'name': 'Drill D', 'focus': 'speed', 'difficulty': 2},
            {'name': 'Drill E', 'focus': 'accuracy', 'difficulty': 1},
        ]

    def recommend_drills(self):
        """
        Generates a list of recommended drills based on user metrics.
        :return: list of recommended drills
        """
        recommended = []
        for drill in self.drills:
            if (drill['focus'] in self.user_metrics['focus_areas']
                and drill['difficulty'] <= self.user_metrics['max_difficulty']):
                recommended.append(drill['name'])
        return recommended

# Example usage:
if __name__ == '__main__':
    user_performance = {
        'focus_areas': ['speed', 'accuracy'],
        'max_difficulty': 2
    }
    engine = RecommendationEngine(user_performance)
    recommendations = engine.recommend_drills()
    print('Recommended Drills:', recommendations)