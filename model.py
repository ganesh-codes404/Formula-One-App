import pandas as pd

# Load the dataset
df = pd.read_csv("f1_dataset/race_results.csv")

# Display the first few rows
print(df.head())

# Check the columns
print(df.columns)

# Check for missing values
print(df.isnull().sum())
