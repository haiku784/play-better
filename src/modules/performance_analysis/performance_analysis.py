import pandas as pd

class PerformanceAnalysis:
    def __init__(self, cleaned_data: pd.DataFrame):
        """Initialize with cleaned gameplay data."""
        self.cleaned_data = cleaned_data

    def calculate_average_score(self) -> float:
        """Calculate the average score from the cleaned data."""
        return self.cleaned_data['score'].mean()

    def calculate_average_playtime(self) -> float:
        """Calculate the average playtime from the cleaned data."""
        return self.cleaned_data['playtime'].mean()

    def generate_user_metrics(self) -> dict:
        """Generate a dictionary of user performance metrics."""
        return {
            'average_score': self.calculate_average_score(),
            'average_playtime': self.calculate_average_playtime()
        }

# Example usage:
# cleaned_data = pd.read_csv('cleaned_gameplay_data.csv')
# analysis = PerformanceAnalysis(cleaned_data)
# user_metrics = analysis.generate_user_metrics()
# print(user_metrics)