import openai

def get_gear_recommendations(user_data):
    openai.api_key = 'YOUR_API_KEY'
    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[
            {'role': 'user', 'content': f'What gear do you recommend for {user_data} gameplay?'}
        ]
    )
    return response.choices[0].message['content']

# Example usage
user_data = 'Fortnite'
best_gear = get_gear_recommendations(user_data)
print(best_gear)