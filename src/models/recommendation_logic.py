def generate_recommendation(score):
    if score > 75:
        return "Recommendation A"
    elif score > 50:
        return "Recommendation B"
    else:
        return "Recommendation C"
