// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Setup prediction button
    document.getElementById('predict-btn').addEventListener('click', predict);
    // Setup example button
    const exampleBtn = document.getElementById('example-btn');
    if (exampleBtn) exampleBtn.addEventListener('click', fillExample);
});

// Fill the form with an example
function fillExample() {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    set('CRIM', 0.12);
    set('ZN', 12.5);
    set('INDUS', 7.5);
    set('chas', 0);
    set('NOX', 0.5);
    set('RM', 6.2);
    set('AGE', 65);
    set('DIS', 4.5);
    set('RAD', 5);
    set('TAX', 320);
    set('PTRATIO', 18.0);
    set('B', 390.0);
    set('LSTAT', 12.0);

    // Visual feedback
    const container = document.querySelector('.form-container');
    if (container) {
        container.style.boxShadow = '0 0 0 3px rgba(27, 111, 191, 0.15) inset, 0 10px 30px rgba(0,0,0,0.08)';
        setTimeout(() => { container.style.boxShadow = 'inset 0 0 10px rgba(0,0,0,0.05)'; }, 600);
    }
}

// Prediction function
async function predict() {
    // Hide previous results
    document.getElementById('result').classList.add('hidden');
    document.getElementById('error').classList.add('hidden');
    // Show loader
    const loader = document.getElementById('loader');
    if (loader) loader.classList.remove('hidden');
    
    // Get input values
    const inputData = {
        CRIM: parseFloat(document.getElementById('CRIM').value) || 0,
        ZN: parseFloat(document.getElementById('ZN').value) || 0,
        INDUS: parseFloat(document.getElementById('INDUS').value) || 0,
        CHAS: parseInt(document.getElementById('chas').value),
        NOX: parseFloat(document.getElementById('NOX').value) || 0,
        RM: parseFloat(document.getElementById('RM').value) || 0,
        AGE: parseFloat(document.getElementById('AGE').value) || 0,
        DIS: parseFloat(document.getElementById('DIS').value) || 0,
        RAD: parseFloat(document.getElementById('RAD').value) || 0,
        TAX: parseFloat(document.getElementById('TAX').value) || 0,
        PTRATIO: parseFloat(document.getElementById('PTRATIO').value) || 0,
        B: parseFloat(document.getElementById('B').value) || 0,
        LSTAT: parseFloat(document.getElementById('LSTAT').value) || 0
    };

    // Get the predict button element
    const predictBtn = document.getElementById('predict-btn');
    
    try {
        // Show loading state
        predictBtn.textContent = 'Predicting...';
        predictBtn.disabled = true;
        
        // Send request to backend
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        });

        const data = await response.json();
        
        if (response.ok) {
            // Display result
            document.getElementById('prediction-value').textContent = 
                data.formatted_pred;
            document.getElementById('result').classList.remove('hidden');
        } else {
            // Display error
            document.getElementById('error-message').textContent = 
                data.error || 'Unknown error occurred';
            document.getElementById('error').classList.remove('hidden');
        }
    } catch (error) {
        // Display network error
        document.getElementById('error-message').textContent = 
            'Network error: ' + error.message;
        document.getElementById('error').classList.remove('hidden');
    } finally {
        // Reset button
        predictBtn.textContent = 'Predict Price';
        predictBtn.disabled = false;
        // Hide loader
        if (loader) loader.classList.add('hidden');
    }
}