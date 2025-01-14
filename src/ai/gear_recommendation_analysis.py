import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from pymongo import MongoClient

class GearRecommendationAnalysis:
    def __init__(self, db_uri, db_name):
        self.client = MongoClient(db_uri)
        self.db = self.client[db_name]
        self.collection = self.db['gear_recommendations']

    def analyze_metrics(self, gameplay_metrics):
        
        # Analyze gameplay metrics to identify patterns
        df = pd.DataFrame(gameplay_metrics)
        x = df[['kills', 'deaths', 'objectives_completed']]
        y = df['preferred_gear']  # This column should contain gear IDs
        model = LinearRegression()
        model.fit(x, y)

        # Generate recommendations based on the model
        recommendations = model.predict(x)
        return recommendations.tolist()

    def save_recommendations(self, user_id, recommendations):
        # Save generated recommendations to MongoDB
        self.collection.insert_one({'user_id': user_id, 'recommendations': recommendations})

    def get_recommendations(self, user_id):
        # Retrieve gear recommendations for a user
        recommendations = self.collection.find_one({'user_id': user_id})
        return recommendations['recommendations'] if recommendations else []
