from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np
import os
import pickle

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))
frontend_dir = os.path.abspath(os.path.join(script_dir, '..', 'frontend'))
templates_dir = os.path.join(frontend_dir, 'templates')
static_dir = os.path.join(frontend_dir, 'static')

app = Flask(__name__, template_folder=templates_dir, static_folder=static_dir)

# Get the directory of the current script
script_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(script_dir, 'housing_model.pkl')

# Load the model
model = joblib.load(model_path)

# Feature names in correct order
features = [
    'CRIM', 'ZN', 'INDUS', 'CHAS', 'NOX', 'RM', 
    'AGE', 'DIS', 'RAD', 'TAX', 'PTRATIO', 'B', 'LSTAT'
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from request
        data = request.get_json()
        
        # Validate input
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        # Create feature array in correct order
        input_data = [data.get(feature, 0) for feature in features]
        
        # Convert to numpy array and reshape
        features_array = np.array(input_data).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(features_array)[0]
        
        # Format prediction
        formatted_pred = round(prediction * 1000)
        
        return jsonify({
            'prediction': formatted_pred,
            'formatted_pred': f"${formatted_pred:,}"
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)