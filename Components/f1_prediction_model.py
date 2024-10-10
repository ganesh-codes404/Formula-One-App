# f1_prediction_model.py
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib

# Load your dataset (replace with your own data source)
data = pd.read_csv('f1_race_data.csv')

# Select features and target variable
X = data[['Qualifying Position', 'Constructor', 'Track', 'Weather']]  # Add more relevant features
y = data['Wins']

# Convert categorical features (e.g., Constructor, Track, Weather) to numeric values
X = pd.get_dummies(X, drop_first=True)

# Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a RandomForestClassifier
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Test the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.2f}")

# Save the trained model to a file
joblib.dump(model, 'f1_winner_model.pkl')
