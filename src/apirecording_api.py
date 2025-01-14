@router.get('/api/gameplay/{user_id}', response_model=list[GameplayMetadata])
async def get_gameplay_metadata(user_id: str):
    # Retrieve metadata from MongoDB
    sessions = list(collection.find({'user_id': user_id}))
    if not sessions:
        raise HTTPException(status_code=404, detail='No records found')
    return sessions