const apiUr = 'http://localhost:8088/api/v1/market-indication';
const Indicators = document.getElementById('Indicator');

// Add click event listener to the Indicator element
Indicators.onclick = function() {
    sendStockPredictionRequest();
};

// Function to send a request for stock prediction
const sendStockPredictionRequest = () => {
    const token = window.localStorage.getItem("Token");

    if (!token) {
        console.error('Error: No token found in localStorage');
        alert("you should sign in first");
        return;
    }

    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    };

    fetch(apiUr, requestOptions)
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    const error = new Error('Failed to fetch Market indicators');
                    error.details = errorData;
                    throw error;
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Market indicators:', data);
            localStorage.setItem('Marketindicators', JSON.stringify(data));
            navigateToPredictionPage();
        })
        .catch(error => {
            console.error('Error:', error.message, error.details || '');
        });
};

// Function to navigate to the prediction page
const navigateToPredictionPage = () => {
    window.location.href = "marketIndicators.html"; // Replace with the actual new page URL
};