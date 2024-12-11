@app.get('/titles/', response_model=List[Title])
async def read_titles():
    # Return the list of all e-sport titles
    return titles
