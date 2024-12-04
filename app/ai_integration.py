import openai"n
openai.api_key = 'your-api-key'

def get_response(prompt):
    response = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        messages=[{'role': 'user', 'content': prompt}]
    )
    return response['choices'][0]['message']['content']
