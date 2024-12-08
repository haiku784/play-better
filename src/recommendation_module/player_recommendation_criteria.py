import json

# Define player attributes and criteria for recommendations
def define_criteria():
    criteria = {
        'skill_level': [1, 2, 3, 4, 5],  # Skill level range
        'win_rate': [0, 100],  # Win rate percentage
        'popularity': [0, 100]  # Popularity scale
    }
    return criteria

# Save criteria to a JSON file for later use
def save_criteria_to_json(criteria):
    with open('criteria.json', 'w') as json_file:
        json.dump(criteria, json_file, indent=4)

# Get criteria and save them
if __name__ == '__main__':
    criteria = define_criteria()
    save_criteria_to_json(criteria)