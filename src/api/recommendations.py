from fastapi import FastAPI
from typing import List, Dict

app = FastAPI()

# Sample user performance data structure
user_performance = {
    1: {'score': 85, 'attempts': 5},
    2: {'score': 70, 'attempts': 4},
    3: {'score': 55, 'attempts': 6}
}

# Function to generate recommendations based on user performance
def generate_recommendations(user_id: int) -> List[str]:
    recommendations = []
    # Get user performance
    performance = user_performance.get(user_id)
    if performance:
        score = performance['score']
        attempts = performance['attempts']
        # Generate recommendations based on score
        if score < 60:
            recommendations.append('Focus on basic concepts.')
            recommendations.append('Practice with easier problems.')
            recommendations.append('Seek help from a tutor.')
        elif 60 <= score < 80:
            recommendations.append('Review the topics you struggled with.')
            recommendations.append('Take some more practice tests.')
            recommendations.append('Join a study group.')
        else:
            recommendations.append('Challenge yourself with advanced problems.')
            recommendations.append('Participate in discussions on forums.')
            recommendations.append('Consolidate your knowledge with teaching others.')
    return recommendations

@app.get('/recommendations/{user_id}', response_model=List[str])
async def get_recommendations(user_id: int):
    return generate_recommendations(user_id)