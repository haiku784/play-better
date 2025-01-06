def query_performance_metrics_by_session(db, session_id):
    """
    Query performance metrics by session ID.
    """
    query = '''
    SELECT * FROM performance_metrics WHERE session_id = ?;
    '''
    db.execute_query(query, (session_id,))
    return db.fetch_all()