class ImprovementSuggestionEngine:
    def __init__(self, metrics):
        """Initialize the suggestion engine with performance metrics."""
        self.metrics = metrics

    def generate_suggestions(self):
        """Generate actionable suggestions based on performance metrics."""
        suggestions = []
        if self.metrics['average_score'] < 50:
            suggestions.append('Focus on improving your accuracy.')
        if self.metrics['win_rate'] < 0.5:
            suggestions.append('Try to work on your teamwork.')
        return suggestions