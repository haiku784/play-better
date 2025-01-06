class PerformanceMetricsController:
    """
    A controller to manage performance metrics CRUD operations.
    """
    def __init__(self, database):
        self.db = database

    def add_metric(self, session_id, frame_rate, resolution, processing_time):
        insert_performance_metric(self.db, session_id, frame_rate, resolution, processing_time)

    def get_metrics(self, session_id):
        return query_performance_metrics_by_session(self.db, session_id)

    def remove_metrics(self, session_id):
        delete_performance_metrics_by_session(self.db, session_id)