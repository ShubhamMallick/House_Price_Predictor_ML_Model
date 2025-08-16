# Boston House Price Prediction Web App

A simple, production-ready web application for predicting Boston housing prices using a trained scikit-learn model. The app features a Flask backend API and a modern, responsive frontend with helpful UI elements, examples, and a sidebar glossary.

## Features

- Fast predictions with a pre-trained model (`housing_model.pkl`)
- Clean UI with icons, colors, loader animation, and responsive design
- "Use Example" autofill for quick testing
- Sidebar with "How to Use" instructions and full forms (feature glossary)

## Project Structure

```
House_Price_Prediction/
├─ backend/
│  ├─ app.py                 # Flask app (routes, model loading)
│  └─ housing_model.pkl      # Trained model (Joblib format)
├─ frontend/
│  ├─ templates/
│  │  └─ index.html          # Main UI
│  └─ static/
│     ├─ styles.css          # Styles and layout
│     └─ app.js              # Frontend logic (fetch, example fill, loader)
└─ README.md                 # This file
```

## Requirements

- Python 3.8+
- pip

Python packages:
- Flask
- numpy
- scikit-learn
- joblib

Frontend:
- Google Fonts (Inter) via CDN
- Font Awesome icons via CDN

## Setup (Windows/macOS/Linux)

1. Create and activate a virtual environment (recommended):
   - Windows (PowerShell):
     ```powershell
     python -m venv .venv
     .\.venv\Scripts\Activate.ps1
     ```
   - macOS/Linux (bash/zsh):
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```

2. Install dependencies:
   ```bash
   pip install flask numpy scikit-learn joblib
   ```

3. Ensure the trained model file exists at `backend/housing_model.pkl`.
   - If you have a different model path or filename, update `backend/app.py` accordingly.

## Run the App

From the project root (`House_Price_Prediction/`):

```bash
python backend/app.py
```

- The Flask server will start (default `http://127.0.0.1:5000/`).
- Open the URL in your browser.

## Usage

- Fill in the fields in the calculator on the left.
- Or click "Use Example" to auto-populate typical values.
- Click "Predict Price" to get the estimated median home value.
- The right sidebar explains the features and provides guidance.

### Example Values

You can use these realistic sample values:
- CRIM: 0.12
- ZN: 12.5
- INDUS: 7.5
- CHAS: 0 (No) or 1 (Yes)
- NOX: 0.5
- RM: 6.2
- AGE: 65
- DIS: 4.5
- RAD: 5
- TAX: 320
- PTRATIO: 18.0
- B: 390.0
- LSTAT: 12.0

## API

- POST `/predict`
  - Body (JSON):
    ```json
    {
      "CRIM": 0.12,
      "ZN": 12.5,
      "INDUS": 7.5,
      "CHAS": 0,
      "NOX": 0.5,
      "RM": 6.2,
      "AGE": 65,
      "DIS": 4.5,
      "RAD": 5,
      "TAX": 320,
      "PTRATIO": 18.0,
      "B": 390.0,
      "LSTAT": 12.0
    }
    ```
  - Response (JSON):
    ```json
    {
      "prediction": 23.4567,
      "formatted_pred": "$23.46k"
    }
    ```
  - Errors return `{ "error": "message" }` with appropriate status code.

## Notes on the Model

- The model is loaded using Joblib: `backend/housing_model.pkl`.
- Ensure the feature order in `backend/app.py` matches the model training order.
- If you retrain the model, export with Joblib to maintain compatibility.

## Frontend Details

- `frontend/templates/index.html`: Core layout with a hero header, form (left), sidebar (right), loader, result and error containers.
- `frontend/static/app.js`:
  - `predict()` collects inputs, calls `/predict`, toggles loader, and displays results.
  - `fillExample()` auto-fills sample inputs.
- `frontend/static/styles.css`: Theme, grid layout, responsive behavior, animations, and sidebar styles.

## Troubleshooting

- TemplateNotFound or missing static files:
  - Confirm Flask app is created with `template_folder='../frontend/templates'` and `static_folder='../frontend/static'` relative to `backend/app.py`.
- Model not found:
  - Confirm `backend/housing_model.pkl` exists and the filename matches exactly.
- CORS or network issues (if serving differently):
  - This app expects frontend to be served by Flask. If hosting frontend elsewhere, you may need CORS handling.
- Prediction errors:
  - Ensure all inputs parse correctly in `app.js` and the backend expects the same keys and order.

## Enhancements Implemented

- Loader spinner with accessible ARIA attributes
- Font Awesome icons and Google Fonts
- Sidebar with instructions and feature glossary
- Button states (disabled during prediction), gradients, subtle animations

## Possible Future Enhancements

- Client-side validation and inline hints
- Input ranges, sliders, or tooltips
- Model monitoring/retraining pipeline
- Dockerfile and CI/CD pipeline

## License

This project is provided as-is for educational and internal demo purposes. Add a license of your choice if distributing.
