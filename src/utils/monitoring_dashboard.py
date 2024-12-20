import matplotlib.pyplot as plt
import pandas as pd
import datetime

# Sample data retrieval function
def get_metrics_over_time():
    # Simulate fetching data from the API
    return {
        'timestamp': ["2023-10-01T12:00:00Z", "2023-10-01T12:01:00Z"],
        'CPU Usage': [75.5, 80.0],
        'Memory Usage': [65.2, 70.5]
    }

# Function to plot metrics
def plot_metrics():
    metrics_data = get_metrics_over_time()
    df = pd.DataFrame(metrics_data)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    
    plt.figure(figsize=(10, 5))
    plt.plot(df['timestamp'], df['CPU Usage'], label='CPU Usage')
    plt.plot(df['timestamp'], df['Memory Usage'], label='Memory Usage')
    plt.xlabel('Timestamp')
    plt.ylabel('Usage (%)')
    plt.title('Performance Metrics Over Time')
    plt.legend()
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.show()