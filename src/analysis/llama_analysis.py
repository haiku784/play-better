import llama

def analyze_gameplay(data):
    insights = llama.analyze(data)
    return insights

if __name__ == '__main__':
    gameplay_data = load_gameplay_data()
    insights = analyze_gameplay(gameplay_data)
    print(insights)