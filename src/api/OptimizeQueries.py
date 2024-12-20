def optimize_queries():
    # Example query optimization function
    # Restructure queries to use more efficient joins and filters
    optimized_query = "SELECT * FROM gameplay_metrics WHERE game_id = ? ORDER BY created_at DESC LIMIT 100"
    return optimized_query

print(optimize_queries())