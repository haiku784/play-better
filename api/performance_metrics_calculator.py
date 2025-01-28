from typing import List, Dict

class PlayerMetricsCalculator:
    """Class to calculate player performance metrics based on match data."""

    @staticmethod
    def calculate_player_metrics(player_id: str, match_data: List[Dict]) -> Dict:
        """Calculates key performance metrics for a given player based on match data provided."""

        goals = 0
        assists = 0
        total_passes = 0
        successful_passes = 0

        for match in match_data:
            goals += match.get('goals', 0)
            assists += match.get('assists', 0)
            total_passes += match.get('total_passes', 0)
            successful_passes += match.get('successful_passes', 0)

        pass_accuracy = (successful_passes / total_passes) * 100 if total_passes > 0 else 0
        player_rating = (goals * 4 + assists * 3 + pass_accuracy) / (4 + 3 + 1) if (goals + assists) > 0 else 0

        return {
            'goals': goals,
            'assists': assists,
            'passAccuracy': pass_accuracy,
            'playerRating': player_rating
        }