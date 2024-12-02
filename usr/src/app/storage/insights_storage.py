from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['gameplay_analysis']

def store_insights(insights):
    db.insights.insert_one(insights)

# Example usage
store_insights({'player': 'test_player', 'analysis': {} })