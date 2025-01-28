from typing import List, Dict

class InsightsGeneratorModule:
    def generate_insights(self, feedback_analysis: Dict[str, List[str]], user_id: str) -> Dict[str, List[str]]:
        """Generates actionable insights based on analyzed feedback.
        Args:
            feedback_analysis (dict): The analysis result containing sentiment and key topics.
            user_id (str): The unique identifier for the user.
        Returns:
            dict: A dictionary containing insights and follow-up actions.
        """  
        insights = self.create_insights(feedback_analysis['sentiment'], feedback_analysis['keyTopics'])
        follow_up_actions = self.create_follow_up_actions(user_id)
        return {'insights': insights, 'followUpActions': follow_up_actions}

    def create_insights(self, sentiment: str, key_topics: List[str]) -> List[str]:
        """Creates insights based on sentiment and key topics.
        Args:
            sentiment (str): The sentiment of the feedback.
            key_topics (list): The list of key topics identified.
        Returns:
            list: A list of insights derived from sentiment and topics.
        """  
        insights = []
        if sentiment == 'positive':
            insights.append('Thank you for your positive feedback!')
        elif sentiment == 'negative':
            insights.append('We are sorry to hear that. We are working on improvements.')
        insights.extend([f'Noted topic: {topic}' for topic in key_topics])
        return insights

    def create_follow_up_actions(self, user_id: str) -> List[str]:
        """Suggests follow-up actions for user engagement.
        Args:
            user_id (str): The unique identifier for the user.
        Returns:
            list: A list of recommended follow-up actions.
        """  
        return ['Please check our latest updates.', 'Join our feedback session.']