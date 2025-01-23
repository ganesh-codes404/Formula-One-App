import os
import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import numpy as np


# Define the root directory where F1 dataset is stored
root_dir = "/Users/ganeshk/Formula1/f1_dataset"

# Path for the year 1950
for i in range (2021,2022):
    year_folder = str(i)
qualifying_folder = os.path.join(root_dir, year_folder, "Qualifying Results")  # Corrected folder name
race_folder = os.path.join(root_dir, year_folder, "Race Results")

# Function to read all files in a folder and print them
def read_all_files_in_folder(folder_path):
    # List all files in the folder
    files = os.listdir(folder_path)
    
    # Iterate through all files in the folder
    for file_name in files:
        file_path = os.path.join(folder_path, file_name)
        
        # Check if it's a CSV file
        if file_name.endswith('.csv'):
            print(f"\nReading file: {file_path}")
            # Read the CSV file
            try:
                df = pd.read_csv(file_path)
                print(df.head())  # Print first few rows of the data
    
            except Exception as e:
                print(f"Error reading file {file_name}: {e}")
    print(df['Position'].dtype)
    def prediction_race(race_data):
        df = race_data
        df['Position'] = pd.to_numeric(df['Position'], errors='coerce')
        # Check the data types of the columns


        # 1. Preprocess Data (Encode Categorical Features)
        le_driver = LabelEncoder()
        le_car = LabelEncoder()

        df['Driver'] = le_driver.fit_transform(df['Driver'])
        df['Car'] = le_car.fit_transform(df['Car'])

        # 2. Features and Target
        X = df[['Driver', 'Car']]  # Input features: Driver and Car
        y = df['Position']  # Target: Position

        # 3. Train-Test Split
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

        # Convert to PyTorch tensors
        X_train = torch.tensor(X_train.values, dtype=torch.float32)
        X_test = torch.tensor(X_test.values, dtype=torch.float32)
        y_train = torch.tensor(y_train.values, dtype=torch.float32).unsqueeze(1)
        y_test = torch.tensor(y_test.values, dtype=torch.float32).unsqueeze(1)

        # 4. Define Neural Network Model
        class F1Predictor(nn.Module):
            def __init__(self):
                super(F1Predictor, self).__init__()
                self.fc1 = nn.Linear(2, 64)  # 2 inputs (Driver, Car)
                self.fc2 = nn.Linear(64, 32)
                self.fc3 = nn.Linear(32, 1)  # Output: Position (regression)

            def forward(self, x):
                x = torch.relu(self.fc1(x))
                x = torch.relu(self.fc2(x))
                x = self.fc3(x)
                return x

        # Initialize model, loss function, and optimizer
        model = F1Predictor()
        criterion = nn.MSELoss()  # Mean Squared Error loss for regression
        optimizer = optim.Adam(model.parameters(), lr=0.0001)

        # 5. Train the Model
        epochs = 100
        for epoch in range(epochs):
            model.train()
            optimizer.zero_grad()
            outputs = model(X_train)
            loss = criterion(outputs, y_train)
            loss.backward()
            optimizer.step()

            if (epoch + 1) % 10 == 0:
                print(f"Epoch {epoch+1}/{epochs}, Loss: {loss.item():.4f}")
            # Assume model and optimizer have been defined
            optimizer = torch.optim.Adam(model.parameters(), lr=0.0001)  # Use a smaller learning rate

            # Training loop
            for epoch in range(100):
                model.train()
                
                # Zero the gradients
                optimizer.zero_grad()

                # Forward pass
                predictions = model(X_train)
                
                # Calculate loss
                loss = criterion(predictions, y_train)
                
                # Check for NaN loss
                if torch.isnan(loss):
                    print(f"NaN loss at epoch {epoch}")
                    break

                # Backward pass
                loss.backward()

                # Clip gradients if necessary
                torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)

                # Update weights
                optimizer.step()
                
                # Print loss every 10 epochs
                if epoch % 10 == 0:
                    print(f"Epoch {epoch+1}/100, Loss: {loss.item()}")

            # Final check for NaN or Inf in predictions
            print(torch.isnan(predictions).any(), torch.isinf(predictions).any())

        # 6. Evaluate the Model
        model.eval()
        with torch.no_grad():
            predictions = model(X_test)
            predictions = predictions.squeeze().round().int()
            accuracy = (predictions == y_test.squeeze().int()).float().mean()
            print(f"Accuracy: {accuracy:.4f}")

        # 7. Predict for New Inputs (Example: Predict Position for Hamilton in a Mercedes)
        driver_input = le_driver.transform(['Lewis Hamilton'])
        car_input = le_car.transform(['Mercedes'])
        new_data = torch.tensor([[driver_input[0], car_input[0]]], dtype=torch.float32)

        model.eval()
        with torch.no_grad():
            predicted_position = model(new_data).item()
            print(f"Predicted Position: {predicted_position:.2f}")
    prediction_race(df)

# Read all qualifying results files
# print("\n--- Qualifying Results ---")
# read_all_files_in_folder(qualifying_folder)

# Read all race results files
print("\n--- Race Results ---")
read_all_files_in_folder(race_folder)
