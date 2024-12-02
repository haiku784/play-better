# Store gear recommendations based on analysis data
def store_gear_recommendations(recommendations):
    db.gear_recommendations.insert_many(recommendations)