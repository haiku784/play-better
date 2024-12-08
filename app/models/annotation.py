from flask_sqlalchemy import SQLAlchemy

# Initialize the SQLAlchemy object

db = SQLAlchemy()

class Annotation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.String(50), nullable=False)
    text = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<Annotation {self.id}>'
