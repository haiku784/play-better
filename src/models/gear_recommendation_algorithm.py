class GearRecommendationAlgorithm:
    """
    A class that contains methods for recommending gaming gear based on user gameplay styles and performance statistics.
    """
    def __init__(self):
        self.gear_database = self._load_gear_database()  # Load available gear information

    def _load_gear_database(self):
        """ Load gear information from a predefined source or database. """
        return [
            {'name': 'Aggressive Mouse', 'type': 'mouse', 'min_aggression': 7},
            {'name': 'Strategic Keyboard', 'type': 'keyboard', 'min_strategy': 8},
            {'name': 'Team Player Headset', 'type': 'headset', 'min_teamwork': 6}
        ]

    def recommend_gear(self, gameplay_style, performance_stats):
        """ Generate gear recommendations based on gameplay style and performance. """
        recommendations = []
        for gear in self.gear_database:
            if (gear['min_aggression'] <= gameplay_style.aggression and
                gear.get('min_strategy', 0) <= gameplay_style.strategy and
                gear.get('min_teamwork', 0) <= gameplay_style.teamwork):
                recommendations.append(gear['name'])
        return recommendations
