from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///metrics.db'
db = SQLAlchemy(app)

class GameplayMetric(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.String(50), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    level = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<GameplayMetric {self.player_id} - Score: {self.score}>'

@app.route('/api/metrics', methods=['POST'])
def submit_metrics():
    if not request.json:
        return jsonify({'error': 'Request must be JSON'}), 400

    player_id = request.json.get('player_id')
    score = request.json.get('score')
    level = request.json.get('level')

    if not all([player_id, score, level]):
        return jsonify({'error': 'Missing data'}), 400

    metric = GameplayMetric(player_id=player_id, score=score, level=level)
    db.session.add(metric)
    db.session.commit()

    return jsonify({'message': 'Metrics submitted successfully'}), 201

if __name__ == '__main__':
    db.create_all()  # Create database tables
    app.run(debug=True)