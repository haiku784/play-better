import unittest
import requests

class TestAPIEndpoints(unittest.TestCase):
    BASE_URL = 'https://example.com/api'

    def test_get_endpoint(self):
        response = requests.get(f'{self.BASE_URL}/endpoint1')
        self.assertEqual(response.status_code, 200)
        self.assertIn('key', response.json())

    def test_post_endpoint(self):
        data = {'key': 'value'}
        response = requests.post(f'{self.BASE_URL}/endpoint2', json=data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()['key'], 'value')

    def test_put_endpoint(self):
        data = {'key': 'new_value'}
        response = requests.put(f'{self.BASE_URL}/endpoint3/1', json=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['key'], 'new_value')

    def test_delete_endpoint(self):
        response = requests.delete(f'{self.BASE_URL}/endpoint3/1')
        self.assertEqual(response.status_code, 204)

if __name__ == '__main__':
    unittest.main()