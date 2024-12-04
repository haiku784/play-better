import openai

def analyze_with_ai(data):
    return openai.Completion.create(engine='text-davinci', prompt=data)