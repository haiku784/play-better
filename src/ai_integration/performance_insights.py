import openai
import llama

# Function to integrate OpenAI and Llama for generating performance insights

def generate_performance_insights(preprocessed_data):
    # Check if the data is not empty
    if not preprocessed_data:
        raise ValueError("Preprocessed data cannot be empty.")

    # Prepare the prompt for the OpenAI API
    prompt = f"Analyze the following gameplay data: {preprocessed_data} 
Generate insights about performance."

    # Call OpenAI API to get insights
    openai.api_key = 'your-openai-api-key'
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        insights = response['choices'][0]['message']['content']
    except Exception as e:
        raise RuntimeError(f"OpenAI API call failed: {e}")

    # Integrate with Llama for further processing if necessary
    llama_output = llama.analyze(insights)  # Assuming llama.analyze is a valid function

    return llama_output

# Example usage
if __name__ == '__main__':
    sample_data = {'score': 100, 'level': 5, 'time_taken': 120}
    insights = generate_performance_insights(sample_data)
    print(insights)