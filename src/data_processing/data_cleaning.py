import pandas as pd

def clean_gameplay_data(df):
    """
    Cleans the gameplay data by removing unnecessary columns
    and rows with missing values.
    
    Parameters:
    df (pd.DataFrame): The DataFrame containing gameplay data.
    
    Returns:
    pd.DataFrame: The cleaned DataFrame ready for normalization.
    """
    # Drop unnecessary columns
    columns_to_drop = ['unnecessary_column1', 'unnecessary_column2']
    df.drop(columns=columns_to_drop, inplace=True, errors='ignore')
    
    # Remove rows with missing values
    df.dropna(inplace=True)
    
    return df
