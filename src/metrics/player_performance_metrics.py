import numpy as np
import pandas as pd

class PlayerPerformanceMetrics:
    def __init__(self, player_data):
        """
        Initializes the PlayerPerformanceMetrics object with player data.
        :param player_data: DataFrame containing player performance data.
        """
        self.player_data = player_data

    def calculate_average_score(self):
        """
        Calculates the average score for each player.
        :return: DataFrame with player names and their average scores.
        """
        average_scores = self.player_data.groupby('player_name')['score'].mean().reset_index()
        average_scores.columns = ['player_name', 'average_score']
        return average_scores

    def calculate_win_percentage(self):
        """
        Calculates the win percentage for each player.
        :return: DataFrame with player names and their win percentages.
        """
        self.player_data['is_win'] = self.player_data['game_result'].apply(lambda x: 1 if x == 'win' else 0)
        win_percentage = self.player_data.groupby('player_name')['is_win'].mean().reset_index()
        win_percentage.columns = ['player_name', 'win_percentage']
        return win_percentage

    def generate_performance_report(self):
        """
        Generates a comprehensive performance report.
        :return: DataFrame containing player names, average scores, and win percentages.
        """
        avg_scores = self.calculate_average_score()
        win_pct = self.calculate_win_percentage()
        report = pd.merge(avg_scores, win_pct, on='player_name')
        return report

# Example usage:
# player_data = pd.DataFrame({'player_name': ['Alice', 'Bob', 'Alice', 'Bob'], 'score': [80, 90, 70, 60], 'game_result': ['win', 'win', 'lose', 'lose']})
# metrics = PlayerPerformanceMetrics(player_data)
# print(metrics.generate_performance_report())