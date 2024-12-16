import numpy as np
import pandas as pd
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

class PerformanceMetrics:
    def __init__(self, y_true, y_pred):
        """Initialize with true and predicted values."""
        self.y_true = y_true
        self.y_pred = y_pred
        self.metrics = {}

    def calculate_accuracy(self):
        """Calculate accuracy of the predictions."""
        self.metrics['accuracy'] = accuracy_score(self.y_true, self.y_pred)
        return self.metrics['accuracy']

    def calculate_precision(self):
        """Calculate precision of the predictions."""
        self.metrics['precision'] = precision_score(self.y_true, self.y_pred, average='weighted')
        return self.metrics['precision']

    def calculate_recall(self):
        """Calculate recall of the predictions."""
        self.metrics['recall'] = recall_score(self.y_true, self.y_pred, average='weighted')
        return self.metrics['recall']

    def calculate_f1_score(self):
        """Calculate F1 score of the predictions."""
        self.metrics['f1'] = f1_score(self.y_true, self.y_pred, average='weighted')
        return self.metrics['f1']

    def generate_metrics(self):
        """Generate all performance metrics and return as a dictionary."""
        self.calculate_accuracy()
        self.calculate_precision()
        self.calculate_recall()
        self.calculate_f1_score()
        self.metrics['confusion_matrix'] = confusion_matrix(self.y_true, self.y_pred).tolist()
        return self.metrics

# Example usage
# y_true = [0, 1, 1, 0, 1]
# y_pred = [0, 1, 0, 0, 1]
# metrics = PerformanceMetrics(y_true, y_pred)
# print(metrics.generate_metrics())
