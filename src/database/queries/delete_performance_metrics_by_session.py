def delete_performance_metrics_by_session(db, session_id):
    """
    Delete performance metrics for a specific session ID.
    """
    delete_query = '''
    DELETE FROM performance_metrics WHERE session_id = ?;
    '''
    db.execute_query(delete_query, (session_id,))