def audit_performance(metrics):
    """Function to analyze performance metrics and identify any issues."""
    average_cpu = sum(metric['CPU Usage'] for metric in metrics) / len(metrics)
    average_memory = sum(metric['Memory Usage'] for metric in metrics) / len(metrics)
    
    warnings = []
    if average_cpu > 80:
        warnings.append('High CPU usage detected.')
    if average_memory > 75:
        warnings.append('High Memory usage detected.')
    
    return average_cpu, average_memory, warnings