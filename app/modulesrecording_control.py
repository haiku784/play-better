def set_latency(stream_id: str, latency_value: int) -> dict:
    # Set the latency value on the specified video stream
    status = "success"
    message = f"Latency set to {latency_value} ms"
    return {'status': status, 'message': message}
