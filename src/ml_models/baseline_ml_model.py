import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Load the sample dataset
file_path = 'data/sample_data.csv'
data = pd.read_csv(file_path)

# Define features and target variable
X = data.drop('target', axis=1)
y = data['target']

# Split the data into training and validation sets
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Validate the model
predictions = model.predict(X_val)

# Calculate accuracy
accuracy = accuracy_score(y_val, predictions)
print(f'Model Accuracy: {accuracy:.2f}')
if accuracy >= 0.75:
    print('Model meets the acceptance criteria.')
else:
    print('Model does not meet the acceptance criteria.')