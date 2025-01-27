from typing import List, Dict, Optional

async def detect_events(match_data: dict, event_types: List[str], time_range: Optional[dict]) -> List[Dict]:
    detected_events = []
    # Logic to iterate through match_data and detect events based on event_types and time_range
    for event in match_data['events']:
        if event['type'] in event_types:
            if time_range:
                if time_range['start_time'] <= event['timestamp'] <= time_range['end_time']:
                    detected_events.append(event)
            else:
                detected_events.append(event)
    return detected_events
