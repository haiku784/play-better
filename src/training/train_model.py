import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import pickle

# Load gameplay data
data = pd.read_csv('data/gameplay_data.csv')

# Prepare features and labels
X = data.drop('target', axis=1)
Y = data['target']

# Split the data into training and testing sets
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

# Initialize and train the model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, Y_train)

# Save the trained model
with open('models/performance_model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)
