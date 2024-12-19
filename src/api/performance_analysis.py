import openai

# Function to analyze performance using OpenAI GPT-3 API

def analyze_performance(performance_data):
    """Analyzes the provided performance data using OpenAI's GPT-3 API."""
    openai.api_key = 'your-api-key'
    
    try:
        # Prepare the API call
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=f"Analyze the following performance data: {performance_data}",
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.5,
        )
        
        # Extract the analysis results
        analysis_result = response.choices[0].text.strip()
        return analysis_result
    except Exception as e:
        print(f"Error during OpenAI API call: {e}")
        return None

# Example usage
if __name__ == '__main__':
    sample_data = "Player scored 90 points in the last game."
    result = analyze_performance(sample_data)
    print(f"Performance Analysis: {result}")