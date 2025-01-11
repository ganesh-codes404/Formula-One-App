import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix


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
    def prediction_race(race_data):
        features = ['Position','Driver Number','Driver','Driver Abbreviation','Car','Laps','Time/Retired','Points']
        target = 'Position' 
        race_data_encoded = pd.get_dummies(race_data[features])
        race_data_encoded['Target'] = (race_data[target] == 1).astype(int)  # Winner is Position == 1

        # Split features and target
        X = race_data_encoded.drop('Target', axis=1)
        y = race_data_encoded['Target']

        # Train-test split
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

        # Train the Naive Bayes model
        model = GaussianNB()
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        conf_matrix = confusion_matrix(y_test, y_pred)
        class_report = classification_report(y_test, y_pred)
        # Make predictions
        
        print("\nModel Evaluation:")
        print(f"Accuracy: {accuracy:.2f}")
        print("\nConfusion Matrix:")
        print(conf_matrix)
        print("\nClassification Report:")
        print(class_report)

        # Predict for a new race (Example input)
        new_race = {
            'Driver Number': [44],
            'Driver': ['Max Verstappen'],
            'Driver Abbreviation': ['VER'],
             'Car':['Red Bull Racing Honda'],# Replace with actual features and values
        }

        # Convert to DataFrame and encode
        new_race_df = pd.DataFrame(new_race)
        new_race_encoded = pd.get_dummies(new_race_df)
        new_race_encoded = new_race_encoded.reindex(columns=X.columns, fill_value=0)

        # Predict the probability of winning
        new_race_pred = model.predict(new_race_encoded)
        new_race_prob = model.predict_proba(new_race_encoded)

        print("\nPrediction for New Race:")
        # print(f"Winning Probability: {new_race_prob[0][1]:.4f}")
        print(f"Prediction: {'Winner' if new_race_pred[0] == 1 else 'Not Winner'}")
    prediction_race(df)

# Read all qualifying results files
# print("\n--- Qualifying Results ---")
# read_all_files_in_folder(qualifying_folder)

# Read all race results files
print("\n--- Race Results ---")
read_all_files_in_folder(race_folder)
