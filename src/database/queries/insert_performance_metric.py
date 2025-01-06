def insert_performance_metric(db, session_id, frame_rate, resolution, processing_time):
    """
    Insert a new performance metric into the database.
    """
    insert_query = '''
    INSERT INTO performance_metrics (session_id, frame_rate, resolution, processing_time)
    VALUES (?, ?, ?, ?);
    '''
    db.execute_query(insert_query, (session_id, frame_rate, resolution, processing_time))