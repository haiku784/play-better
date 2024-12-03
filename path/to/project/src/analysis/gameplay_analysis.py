import llama

def analyze_gameplay_data(data):
    insights = llama.analyze(data)
    return insights

# Example usage
if __name__ == '__main__':
    gameplay_data = load_data('gameplay_sessions.json')
    insights = analyze_gameplay_data(gameplay_data)
    print(insights)