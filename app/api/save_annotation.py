from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///annotations.db'
db = SQLAlchemy(app)

class Annotation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.String(50), nullable=False)
    text = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<Annotation {self.id}>'

@app.route('/api/annotations', methods=['POST'])
def save_annotation():
    data = request.json
    video_id = data.get('video_id')
    text = data.get('text')
    timestamp = data.get('timestamp')
    
    if not video_id or not text or not timestamp:
        return jsonify({'error': 'Missing data'}), 400
    
    new_annotation = Annotation(video_id=video_id, text=text, timestamp=timestamp)
    db.session.add(new_annotation)
    db.session.commit()
    
    return jsonify({'message': 'Annotation saved', 'id': new_annotation.id}), 201

if __name__ == '__main__':
    db.create_all()  # Creates database and tables
    app.run(debug=True)
