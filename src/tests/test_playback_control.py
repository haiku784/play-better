def test_play_endpoint():
    response = client.post("/play")
    assert response.status_code == 200
    assert response.json()['status'] == 'playing'

def test_pause_endpoint():
    response = client.post("/pause")
    assert response.status_code == 200
    assert response.json()['status'] == 'paused'

def test_rewind_endpoint():
    response = client.post("/rewind")
    assert response.status_code == 200
    assert response.json()['status'] == 'rewinding'

def test_fastforward_endpoint():
    response = client.post("/fastforward")
    assert response.status_code == 200
    assert response.json()['status'] == 'fast forwarding'

def test_set_speed_endpoint():
    response = client.post("/setspeed", json={'speed': 1.5})
    assert response.status_code == 200
    assert response.json()['new_speed'] == 1.5
