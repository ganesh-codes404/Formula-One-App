# app.py
from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd

# Create the Flask app
app = Flask(__name__)

# Load the trained model
model = joblib.load('f1_winner_model.pkl')

# Define the prediction route
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.json
        
        # Extract features from the input
        features = pd.DataFrame({
            'Qualifying Position': [data['qualifying_position']],
            'Constructor': [data['constructor']],
            'Track': [data['track']],
            'Weather': [data['weather']]
        })
        
        # Convert categorical data to numerical (one-hot encoding)
        features = pd.get_dummies(features, drop_first=True)
        
        # Ensure columns match model training
        columns = ['Qualifying Position', 'Constructor_Ferrari', 'Constructor_RedBull', 
                   'Track_Monaco', 'Track_Spa', 'Weather_Wet']  # Update based on your model
        
        # Add missing columns (if any) for consistency
        for col in columns:
            if col not in features.columns:
                features[col] = 0
        
        features = features[columns]  # Reorder columns

        # Make prediction using the loaded model
        prediction = model.predict(features)
        
        # Return the prediction as a JSON response
        return jsonify({'winner_prediction': int(prediction[0])})
    
    except Exception as e:
        return jsonify({'error': str(e)})

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
