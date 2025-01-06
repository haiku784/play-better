def create_performance_metrics_table(db):
    """
    Create a table for storing video performance metrics.
    """
    create_table_query = '''
    CREATE TABLE IF NOT EXISTS performance_metrics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        frame_rate INTEGER,
        resolution TEXT,
        processing_time REAL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    '''
    db.execute_query(create_table_query)