import unittest
from app import app, db, Annotation

class TestAnnotationAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_save_annotation(self):
        response = self.app.post('/api/annotations', json={
            'video_id': '123'
            'text': 'Great scene!',
            'timestamp': 12.3
        })
        self.assertEqual(response.status_code, 201)
        self.assertIn('Annotation saved', str(response.data))

if __name__ == '__main__':
    unittest.main()
