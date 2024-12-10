import pandas as pd
from sklearn.preprocessing import MinMaxScaler

def normalize_gameplay_data(df):
    """
    Normalizes gameplay metrics in the DataFrame to a range of [0, 1].
    
    Parameters:
    df (pd.DataFrame): The DataFrame containing gameplay data to normalize.
    
    Returns:
    pd.DataFrame: The normalized DataFrame.
    """
    scaler = MinMaxScaler()
    normalized_data = scaler.fit_transform(df)
    normalized_df = pd.DataFrame(normalized_data, columns=df.columns)
    
    return normalized_df
