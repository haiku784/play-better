import numpy as np
import pandas as pd

class OptimizationRecommendation:
    def __init__(self, gameplay_data):
        self.gameplay_data = gameplay_data

    def analyze_performance(self):
        # Calculate average performance metrics
        avg_performance = self.gameplay_data.mean()
        return avg_performance

    def suggest_optimizations(self):
        avg_performance = self.analyze_performance()
        recommendations = []

        if avg_performance['score'] < 50:
            recommendations.append('Increase difficulty level for better scoring')
        if avg_performance['time_spent'] > 120:
            recommendations.append('Reduce time spent on each level')
        if avg_performance['actions_per_minute'] < 20:
            recommendations.append('Encourage more actions to improve engagement')

        return recommendations

# Sample usage
# gameplay_data should be a DataFrame containing metrics from gameplay sessions.
# example_data = pd.DataFrame({'score': [40, 55, 60], 'time_spent': [130, 90, 80], 'actions_per_minute': [15, 25, 22]})
# optimizer = OptimizationRecommendation(example_data)
# print(optimizer.suggest_optimizations())