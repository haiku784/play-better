import pytest
from api.highlight_detection_module import HighlightDetectionModule

def test_identify_key_moments():
    module = HighlightDetectionModule()
    game_data = {'events': [
        {'type': 'kill', 'player_id': 'p1', 'timestamp': 12.3},
        {'type': 'objective', 'player_id': 'p2', 'timestamp': 15.6},
        {'type': 'other', 'player_id': 'p3', 'timestamp': 18.0}
    ]}
    criteria = {'event_types': ['kill', 'objective']}
    key_moments = module.identify_key_moments(game_data, criteria)
    assert len(key_moments) == 2
    assert key_moments[0]['type'] == 'kill'
    assert key_moments[1]['type'] == 'objective'