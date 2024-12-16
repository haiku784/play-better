import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score

# Load preprocessed gameplay data
# Assuming the data is in a CSV format and has been preprocessed and cleaned
file_path = 'data/preprocessed_gameplay_data.csv'
data = pd.read_csv(file_path)

# Define features and target variable
# Assuming 'target' is the column we want to predict
X = data.drop(columns=['target'])
y = data['target']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the Random Forest Classifier
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Train the model
model.fit(X_train, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
report = classification_report(y_test, y_pred)

# Print performance metrics
print(f'Accuracy: {accuracy:.2f}')
print('Classification Report:
', report)