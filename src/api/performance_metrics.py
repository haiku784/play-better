import logging

class PerformanceMetrics:
    @staticmethod
    def log_latency(api_name, latency):
        logging.basicConfig(filename='api_latencies.log', level=logging.INFO)
        logging.info(f'{api_name} latency: {latency:.2f} seconds')

# Usage example:
if __name__ == '__main__':
    PerformanceMetrics.log_latency('Llama API', 0.123)
    PerformanceMetrics.log_latency('OpenAI API', 0.456)