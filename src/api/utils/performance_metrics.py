import statistics

class PerformanceMetrics:
    def __init__(self):
        self.latencies = []

    def add_response_time(self, latency):
        self.latencies.append(latency)

    def average_latency(self):
        return statistics.mean(self.latencies) if self.latencies else 0

    def percentile_latency(self, percentile):
        return statistics.quantiles(self.latencies, n=100)[percentile-1] if self.latencies else 0

    def report(self):
        avg = self.average_latency()
        p95 = self.percentile_latency(95)
        print(f'Average Latency: {avg:.2f} ms, 95th Percentile Latency: {p95:.2f} ms')
