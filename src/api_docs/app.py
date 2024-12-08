"""
This module contains API documentation for the application using OpenAPI specification.
"""
from flask import Flask
from flask_restful import Api
from flask_swaggers import swagger

app = Flask(__name__)
api = Api(app)

# Swagger configuration
@app.route('/swagger.json')
def swagger_spec():
    return swagger(app)

if __name__ == '__main__':
    app.run(debug=True)