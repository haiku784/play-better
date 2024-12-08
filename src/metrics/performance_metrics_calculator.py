import pandas as pd

class PerformanceMetricsCalculator:
    def __init__(self, session_data):
        '''Initializes the calculator with session data.'''
        self.session_data = session_data

    def calculate_metrics(self):
        '''Calculates performance metrics for each gameplay session. Returns a DataFrame.'''  
        metrics = []
        for session in self.session_data:
            # Example calculations
            score = session['score']
            time_taken = session['time_taken']
            accuracy = session['correct_answers'] / session['total_questions']
            metrics.append({
                'session_id': session['session_id'],
                'score': score,
                'time_taken': time_taken,
                'accuracy': accuracy
            })
        return pd.DataFrame(metrics)

# Sample usage (this part should be in another file):
if __name__ == '__main__':
    # Example data;
    sessions = [
        {'session_id': 1, 'score': 85, 'time_taken': 120, 'correct_answers': 18, 'total_questions': 20},
        {'session_id': 2, 'score': 90, 'time_taken': 150, 'correct_answers': 19, 'total_questions': 20},
    ]

    calculator = PerformanceMetricsCalculator(sessions)
    results = calculator.calculate_metrics()
    print(results)