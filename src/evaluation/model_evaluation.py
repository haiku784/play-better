import pandas as pd
from sklearn.metrics import confusion_matrix, classification_report

# Load the validation set and predictions
validation_data = pd.read_csv('data/processed_data.csv')
true_labels = validation_data['target']
model_predictions = [True, False, True]  # Example predictions, replace with model outputs

# Evaluate the model
conf_matrix = confusion_matrix(true_labels, model_predictions)
class_report = classification_report(true_labels, model_predictions)

print('Confusion Matrix:')
print(conf_matrix)
print('Classification Report:')
print(class_report)