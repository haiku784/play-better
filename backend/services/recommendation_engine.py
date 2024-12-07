class RecommendationEngine:
    def __init__(self, user_preferences):
        self.user_preferences = user_preferences  # Example: {'playstyle': 'aggressive', 'favorite_weapon': 'sniper'}

    def suggest_gear(self):
        # Dummy gear recommendations based on user preferences
        suggestions = []
        if self.user_preferences['playstyle'] == 'aggressive':
            suggestions.append('Assault Rifle')
        else:
            suggestions.append('Stealth Gear')
        return suggestions

if __name__ == '__main__':
    preferences = {'playstyle': 'aggressive', 'favorite_weapon': 'sniper'}
    engine = RecommendationEngine(preferences)
    print(engine.suggest_gear())