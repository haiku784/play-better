class RecommendationService:
    def __init__(self, metrics):
        self.metrics = metrics

    def generate_recommendations(self):
        # Generate recommendations based on metrics
        recommendations = []
        if self.metrics['performance'] < 50:
            recommendations.append('Focus on strengthening your defense.')
        if 'aggressive playstyle' in self.metrics['style']:
            recommendations.append('Try using melee gear for more damage.')
        return recommendations

# Example usage:
metrics = {'performance': 45, 'style': 'aggressive playstyle'}
service = RecommendationService(metrics)
print(service.generate_recommendations())