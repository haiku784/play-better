class ConfigurationRecommender:
    def __init__(self, user_hardware):
        self.user_hardware = user_hardware

    def recommend_settings(self):
        recommendations = {}
        if self.user_hardware['CPU'] < 4:
            recommendations['graphics'] = 'Low'
        else:
            recommendations['graphics'] = 'High'
        return recommendations

# Example usage
hardware_info = {'CPU': 2, 'RAM': 8}
recommender = ConfigurationRecommender(hardware_info)
print(recommender.recommend_settings())
