import os
import pandas as pd

# Define the root directory where F1 dataset is stored
root_dir = "/Users/ganeshk/Formula1/f1_dataset"

# Path for the year 1950
year_folder = "1950"
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

# Read all qualifying results files
print("\n--- Qualifying Results ---")
read_all_files_in_folder(qualifying_folder)

# Read all race results files
print("\n--- Race Results ---")
read_all_files_in_folder(race_folder)
