@app.delete('/titles/{title_id}', response_model=Title)
async def delete_title(title_id: int):
    # Delete a title from the list
    for index, t in enumerate(titles):
        if t.id == title_id:
            return titles.pop(index)
    raise HTTPException(status_code=404, detail="Title not found")
