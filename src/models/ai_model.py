import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

class AIModel:
    def __init__(self, data):
        """Initialize the AI Model with gameplay data."""
        self.data = data
        self.model = RandomForestClassifier()
        self.weaknesses = None

    def preprocess_data(self):
        """Preprocess the data for training."""
        # Assuming 'target' is the column indicating user performance
        X = self.data.drop(columns=['target'])
        y = self.data['target']
        return train_test_split(X, y, test_size=0.2, random_state=42)

    def train_model(self):
        """Train the AI model to identify weaknesses."""
        X_train, X_test, y_train, y_test = self.preprocess_data()
        self.model.fit(X_train, y_train)
        y_pred = self.model.predict(X_test)
        print(classification_report(y_test, y_pred))

    def identify_weaknesses(self):
        """Identify weaknesses based on feature importances."""
        importances = self.model.feature_importances_
        feature_names = self.data.columns[:-1]
        self.weaknesses = pd.Series(importances, index=feature_names).nlargest(5)
        return self.weaknesses

    def suggest_routines(self):
        """Suggest practice routines based on identified weaknesses."""
        if self.weaknesses is None:
            raise Exception("No weaknesses identified. Train the model first.")
        suggestions = {index: f"Practice {index} for at least 30 minutes." for index in self.weaknesses.index}
        return suggestions

# Example usage:
# data = pd.read_csv('gameplay_data.csv')
# model = AIModel(data)
# model.train_model()
# weaknesses = model.identify_weaknesses()
# routines = model.suggest_routines()