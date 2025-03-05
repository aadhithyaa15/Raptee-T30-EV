# Step 1: Import Libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt
from imblearn.over_sampling import SMOTE

# Step 2: Load and Preprocess the Data
# Load the dataset
data = pd.read_excel('sensor_dataset_updated.xlsx', sheet_name='Sheet1')

# Select only sensor-related columns
sensor_columns = [
    'Speed (km/h)', 'Battery (%)', 'Gyrometer (°/s)', 'Accelerometer (m/s²)', 
    'Barometer (hPa)', 'GPS Accuracy (m)', 'Altitude (m)'
]
X = data[sensor_columns]  # Features (sensor inputs)
y = data['SOS'].map({'Yes': 1, 'No': 0})  # Target variable

# Check for missing values
print("Missing values in each column:")
print(X.isnull().sum())

# Drop rows with missing values (if any)
X = X.dropna()
y = y[X.index]

# Step 3: Exploratory Data Analysis (EDA)
# Distribution of the target variable
sns.countplot(x=y)
plt.title('Distribution of SOS (Accident Prone)')
plt.show()

# Pairplot for sensor features
sns.pairplot(data[sensor_columns + ['SOS']], hue='SOS')
plt.title('Pairplot of Sensor Features')
plt.show()

# Correlation matrix
# Create a temporary copy of the DataFrame
data_temp = data.copy()

# Replace 'Yes' and 'No' in 'SOS' column with 1 and 0
data_temp['SOS'] = data_temp['SOS'].map({'Yes': 1, 'No': 0})

# Calculate correlation matrix using the temporary DataFrame
plt.figure(figsize=(10, 8))
sns.heatmap(data_temp[sensor_columns + ['SOS']].corr(), annot=True, cmap='coolwarm')
plt.title('Correlation Matrix of Sensor Features')
plt.show()

# Step 4: Feature Engineering
# Derive new features (example: speed variation, altitude change rate)
data['Speed Variation'] = data['Speed (km/h)'].diff().abs()
data['Altitude Change Rate'] = data['Altitude (m)'].diff().abs()

# Drop rows with NaN values (due to diff operation)
data = data.dropna()

# Update features and target
X = data[sensor_columns + ['Speed Variation', 'Altitude Change Rate']]
y = data['SOS'].map({'Yes': 1, 'No': 0})

# Step 5: Split the Data
# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Normalize/scale numerical features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Step 6: Handle Imbalanced Data (if necessary)
# Check class distribution
print("Class distribution in training set:")
print(y_train.value_counts())

# Apply SMOTE to balance the dataset
smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

# Step 7: Train the Model
# Train a Random Forest Classifier
model = RandomForestClassifier(random_state=42)
model.fit(X_train_res, y_train_res)

# Step 8: Evaluate the Model
# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
print("\nModel Evaluation:")
print("Accuracy:", accuracy_score(y_test, y_pred))
print("Precision:", precision_score(y_test, y_pred))
print("Recall:", recall_score(y_test, y_pred))
print("F1 Score:", f1_score(y_test, y_pred))

# Classification report
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Confusion matrix
sns.heatmap(confusion_matrix(y_test, y_pred), annot=True, fmt='d', cmap='Blues')
plt.title('Confusion Matrix')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.show()

# Step 9: Real-Time Prediction Function
def predict_accident(sensor_data):
    """
    Predicts whether a situation is accident-prone based on sensor data.
    
    Args:
        sensor_data (list): A list of sensor values in the following order:
                            [Speed (km/h), Battery (%), Gyrometer (°/s), 
                             Accelerometer (m/s²), Barometer (hPa), 
                             GPS Accuracy (m), Altitude (m), 
                             Speed Variation, Altitude Change Rate]
    
    Returns:
        str: "Accident Prone" or "Safe"
    """
    # Convert input to a numpy array and reshape for prediction
    sensor_data = np.array(sensor_data).reshape(1, -1)
    
    # Scale the input data
    sensor_data_scaled = scaler.transform(sensor_data)
    
    # Make prediction
    prediction = model.predict(sensor_data_scaled)
    
    return "Accident Prone" if prediction[0] == 1 else "Safe"

# Example usage
sensor_input = [80.0, 20.0, 300.0, 20.0, 980.0, 15.0, 50.0, 30.0, 15.0]  # Example sensor data
result = predict_accident(sensor_input)
print("\nReal-Time Prediction:")
print(f"Sensor Input: {sensor_input}")
print(f"Prediction: {result}")
