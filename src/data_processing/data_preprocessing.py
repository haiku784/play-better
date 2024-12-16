import pandas as pd
import numpy as np

# Function to clean and normalize gameplay data

def preprocess_gameplay_data(dataframe):
    """
    Cleans and normalizes the gameplay data for analysis.

    Parameters:
    dataframe (pd.DataFrame): DataFrame containing raw gameplay data.

    Returns:
    pd.DataFrame: Cleaned and normalized DataFrame.
    """

    # Step 1: Remove duplicates
    dataframe = dataframe.drop_duplicates()

    # Step 2: Handle missing values
    # Filling missing numerical values with the median
    num_cols = dataframe.select_dtypes(include=[np.number]).columns.tolist()
    for col in num_cols:
        dataframe[col].fillna(dataframe[col].median(), inplace=True)
    
    # Filling missing categorical values with the mode
    cat_cols = dataframe.select_dtypes(include=[object]).columns.tolist()
    for col in cat_cols:
        dataframe[col].fillna(dataframe[col].mode()[0], inplace=True)

    # Step 3: Normalize numerical features
    for col in num_cols:
        min_val = dataframe[col].min()
        max_val = dataframe[col].max()
        dataframe[col] = (dataframe[col] - min_val) / (max_val - min_val)

    # Step 4: Convert categorical variables to dummy variables
    dataframe = pd.get_dummies(dataframe, columns=cat_cols, drop_first=True)

    return dataframe

# Example usage:
#if __name__ == '__main__':
#    sample_data = pd.DataFrame({'Score': [100, 150, np.nan, 200], 'Level': ['Easy', 'Medium', 'Easy', np.nan]})
#    cleaned_data = preprocess_gameplay_data(sample_data)
#    print(cleaned_data)