async def get_feedback_by_user_id(user_id: str):
    feedback = await feedback_collection.find({"user_id": user_id}).to_list(length=100)
    return feedback
