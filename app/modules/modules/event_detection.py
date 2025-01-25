from typing import List, Dict, Optional

class EventDetectionModule:
    def __init__(self):
        pass

    def detect_events(self, match_data: Dict, event_types: List[str], time_range: Optional[Dict] = None) -> List[Dict]:
        """Identifies significant gameplay events based on specified event types and conditions."""
        detected_events = []
        # Assuming match_data contains a list of events
        for event in match_data.get('events', []):
            if event['type'] in event_types:
                if time_range:
                    if time_range['start_time'] <= event['timestamp'] <= time_range['end_time']:
                        detected_events.append(event)
                else:
                    detected_events.append(event)
        return detected_events

    def filter_events(self, detected_events: List[Dict], importance_threshold: float) -> List[Dict]:
        """Filters detected events based on criteria such as importance and relevance."""
        highlighted_events = [event for event in detected_events if event['importance'] >= importance_threshold]
        return highlighted_events

# Example usage
# module = EventDetectionModule()
# detected = module.detect_events(match_data, ['goal', 'foul'], {'start_time': 10, 'end_time': 90})
# highlights = module.filter_events(detected, importance_threshold=5)