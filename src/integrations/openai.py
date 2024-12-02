# Integration code to fetch gear recommendations from OpenAI
class OpenAIIntegration:
    def fetch_gear_recommendations(prompt):
        response = openai.ChatCompletion.create(model='gpt-3.5-turbo', messages=[{'role': 'user', 'content': prompt}])
        return response['choices'][0]['message']['content']