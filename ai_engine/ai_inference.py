# ai_inference.py - Optimize AI model inference for low-latency responses.
import time
def run_inference(model, data):
    start_time = time.time()
    results = model.predict(data)
    latency = time.time() - start_time
    assert latency < 0.2, 'Inference took too long!'
    return results