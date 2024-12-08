from flask import Flask
from flask_restplus import Api, Resource

app = Flask(__name__)
api = Api(app, version='1.0', title='Sample API', description='A sample API for demonstrating OpenAPI documentation')

ns = api.namespace('tasks', description='Task operations')

tasks = [{'id': 1, 'task': 'Build an OpenAPI documentation example'}, {'id': 2, 'task': 'Review the API documentation'}]

@ns.route('/tasks')
class TaskList(Resource):
    '''Shows a list of all tasks and single task details''' 
    @ns.doc('list_tasks')
    def get(self):
        '''List all tasks''' 
        return tasks

@ns.route('/tasks/<int:id>')
@ns.response(404, 'Task not found')
class Task(Resource):
    '''Show a single task and delete it''' 
    @ns.doc('get_task')
    def get(self, id):
        '''Fetch a given resource''' 
        for task in tasks:
            if task['id'] == id:
                return task
        api.abort(404)

if __name__ == '__main__':
    app.run(debug=True)