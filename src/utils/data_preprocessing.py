import pandas as pd

# Function to preprocess incoming game data

def preprocess_game_data(df):
    # Example preprocessing steps
    df['feature_1'] = df['feature_1'].fillna(df['feature_1'].mean())
    df['feature_2'] = (df['feature_2'] - df['feature_2'].min()) / (df['feature_2'].max() - df['feature_2'].min())
    return df
