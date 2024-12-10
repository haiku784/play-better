@app.put('/titles/{title_id}', response_model=Title)
async def update_title(title_id: int, title: Title):
    # Update an existing title's information
    for index, t in enumerate(titles):
        if t.id == title_id:
            titles[index] = title
            return title
    raise HTTPException(status_code=404, detail="Title not found")
