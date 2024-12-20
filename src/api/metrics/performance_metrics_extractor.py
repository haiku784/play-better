class PerformanceMetricsExtractor:
    def __init__(self, gameplay_data):
        self.data = gameplay_data

    def calculate_average_score(self):
        total_score = sum(record['score'] for record in self.data)
        return total_score / len(self.data) if self.data else 0.0

    def calculate_win_rate(self):
        total_games = len(self.data)
        total_wins = sum(1 for record in self.data if record['result'] == 'win')
        return total_wins / total_games if total_games else 0.0

    def extract_metrics(self):
        return {
            "average_score": self.calculate_average_score(),
            "win_rate": self.calculate_win_rate()
        }