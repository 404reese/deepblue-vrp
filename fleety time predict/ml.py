import pickle
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
import joblib
from geopy.distance import geodesic
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import xgboost as xgb

# Load dataset
file_path = "Travel_Times - Manila.csv"
df = pd.read_csv(file_path)

# Data Preprocessing
df["Distance (km)"] = np.random.uniform(1, 20, df.shape[0])  # Simulating distance data
df_clean = df[["Distance (km)", "Mean Travel Time (Seconds)"]].dropna()

# Features and target
X = df_clean[["Distance (km)"]]
y = df_clean["Mean Travel Time (Seconds)"]

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train XGBoost Model
model = xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, random_state=42)
model.fit(X_train, y_train)

# Evaluate Model
y_pred = model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
print(f"Model RMSE: {rmse:.2f} seconds")

# Save Model
joblib.dump(model, "travel_time_model.pkl")

# Flask App
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    """API endpoint to predict travel time based on coordinates."""
    data = request.get_json()
    origin = data.get("origin")  # [lat, lon]
    destination = data.get("destination")  # [lat, lon]
    
    if not origin or not destination:
        return jsonify({"error": "Missing 'origin' or 'destination' parameter"}), 400
    
    try:
        # Compute distance in km
        distance = geodesic(tuple(origin), tuple(destination)).km
        
        # Load trained model
        model = joblib.load("travel_time_model.pkl")
        prediction = float(model.predict([[distance]])[0])  # Convert float32 to float

        
        return jsonify({
            "distance_km": round(distance, 2),
            "predicted_travel_time_seconds": round(prediction, 2)
        })
    except ValueError:
        return jsonify({"error": "Invalid coordinate values"}), 400

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)
