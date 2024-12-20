def generate_recommendations(preferences):
    # Sample logic to generate recommendations based on genres
    if preferences.preferred_genres:
        return [f"Recommended item for {genre}" for genre in preferences.preferred_genres.split(',')]
    return []