import pandas as pd
from sklearn.preprocessing import MinMaxScaler

class DataPreprocessor:
    def __init__(self, data):
        """ Initializes the DataPreprocessor with gameplay data. """
        self.data = data
        self.scaler = MinMaxScaler()

    def clean_data(self):
        """ Cleans the gameplay data by handling missing values and duplicates. """
        # Drop duplicates
        self.data.drop_duplicates(inplace=True)
        # Fill missing values with the mean of the column
        self.data.fillna(self.data.mean(), inplace=True)
        return self.data

    def normalize_data(self):
        """ Normalizes the gameplay data using Min-Max scaling. """ 
        # Apply Min-Max scaling
        scaled_data = self.scaler.fit_transform(self.data)
        return pd.DataFrame(scaled_data, columns=self.data.columns)

    def preprocess(self):
        """ Cleans and normalizes the gameplay data. """ 
        cleaned_data = self.clean_data()
        normalized_data = self.normalize_data()
        return normalized_data