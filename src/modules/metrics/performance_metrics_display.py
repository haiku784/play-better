import matplotlib.pyplot as plt
import numpy as np

class PerformanceMetricsDisplay:
    def __init__(self, metrics):
        """Initialize with performance metrics data"""
        self.metrics = metrics

    def display_metrics(self):
        """Display metrics in a user-friendly format"""
        print("Performance Metrics:")
        for metric, value in self.metrics.items():
            print(f"{metric}: {value}")

    def visualize_metrics(self):
        """Create bar chart for metrics visualization"""
        metric_names = list(self.metrics.keys())
        metric_values = list(self.metrics.values())

        y_pos = np.arange(len(metric_names))
        plt.bar(y_pos, metric_values, align='center', alpha=0.5)
        plt.xticks(y_pos, metric_names)
        plt.ylabel('Values')
        plt.title('Performance Metrics Visualization')

        plt.show()

# Example usage:
if __name__ == '__main__':
    metrics_data = {'Accuracy': 0.95, 'Precision': 0.93, 'Recall': 0.90}
    performance_display = PerformanceMetricsDisplay(metrics_data)
    performance_display.display_metrics()
    performance_display.visualize_metrics()