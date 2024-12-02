@router.get('/annotations/{gameplay_id}')
def get_annotations(gameplay_id: str):
    # Logic to retrieve annotations from the database
    return annotations