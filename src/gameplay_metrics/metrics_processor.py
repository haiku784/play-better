from typing import List, Dict, Union

# Function to process gameplay recordings and extract metrics.
def process_gameplay_recordings(recordings: List[Dict[str, Union[str, float]]]) -> Dict[str, float]:
    """
    Processes gameplay recordings to extract performance metrics.
    Metrics include accuracy and average response time.
    
    Args:
        recordings (List[Dict[str, Union[str, float]]]): A list of gameplay recordings. Each recording is a dictionary containing 'correct', 'total', and 'response_time'.
    
    Returns:
        Dict[str, float]: A dictionary containing accuracy and average response time.
    """
    # Initialize metrics
    total_correct = 0
    total_responses = 0
    total_response_time = 0.0
    
    # Iterate through each recording to aggregate metrics
    for recording in recordings:
        total_correct += recording.get('correct', 0)
        total_responses += recording.get('total', 0)
        total_response_time += recording.get('response_time', 0.0)

    # Calculate accuracy as a percentage
    accuracy = (total_correct / total_responses * 100) if total_responses > 0 else 0.0
    # Calculate average response time
    average_response_time = (total_response_time / total_responses) if total_responses > 0 else 0.0

    # Return processed metrics
    return {
        'accuracy': accuracy,
        'average_response_time': average_response_time
    }