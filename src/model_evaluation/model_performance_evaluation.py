import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import GridSearchCV

# Load dataset
# Assuming the dataset is in CSV format and has features and target variable

def load_data(file_path):
    data = pd.read_csv(file_path)
    X = data.drop('target', axis=1)
    y = data['target']
    return X, y

# Function to evaluate model performance

def evaluate_model(model, X_test, y_test):
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f'Accuracy: {accuracy:.2f}')
    return accuracy

# Function to tune model parameters using GridSearchCV

def tune_model(X_train, y_train):
    model = RandomForestClassifier()
    param_grid = {
        'n_estimators': [100, 200, 300],
        'max_depth': [None, 10, 20],
        'min_samples_split': [2, 5, 10]
    }
    grid_search = GridSearchCV(model, param_grid, cv=5)
    grid_search.fit(X_train, y_train)
    print(f'Best parameters: {grid_search.best_params_}')
    return grid_search.best_estimator_

# Main function to run the entire workflow

def main(file_path):
    X, y = load_data(file_path)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = tune_model(X_train, y_train)
    evaluate_model(model, X_test, y_test)

# Execute the main function
if __name__ == '__main__':
    main('path_to_your_data.csv')