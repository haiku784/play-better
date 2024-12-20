import statistics

# Function to calculate metrics from responses

def calculate_metrics(responses, total_time):
    successful_requests = responses.count(200)
    latency_times = [response.elapsed.total_seconds() * 1000 for response in responses] # converting to milliseconds
    avg_latency = statistics.mean(latency_times)
    p95_latency = statistics.quantiles(latency_times, n=100)[94]  # 95th percentile
    return successful_requests, avg_latency, p95_latency

# Example usage
responses, total_time = load_test(10000, 1000)
successful_requests, avg_latency, p95_latency = calculate_metrics(responses, total_time)
print(f'Successful Requests: {successful_requests}')
print(f'Average Latency: {avg_latency} ms')
print(f'95th Percentile Latency: {p95_latency} ms')
