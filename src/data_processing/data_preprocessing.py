# Import required libraries
import pandas as pd

# Function to preprocess the data

def preprocess_data(file_path):
    # Load the data
    data = pd.read_csv(file_path)
    # Handle missing values
    data.fillna(method='ffill', inplace=True)
    # Convert categorical features to numerical
    data = pd.get_dummies(data)
    return data

# Specify data file
input_file = 'data/sample_data.csv'

# Call the preprocessing function
processed_data = preprocess_data(input_file)
# Save the processed data
processed_data.to_csv('data/processed_data.csv', index=False)