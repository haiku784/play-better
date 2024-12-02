import llama

def analyze_gameplay_data(gameplay_data):
    insights = llama.analyze(gameplay_data)
    return insights

if __name__ == '__main__':
    sample_data = '...'  # Replace with actual data
    insights = analyze_gameplay_data(sample_data)
    print(insights)