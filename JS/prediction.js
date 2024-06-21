document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the prediction data from local storage
    const storedData = localStorage.getItem('predictionData');

    if (storedData) {
        // Parse the JSON data
        const predictionData = JSON.parse(storedData);
        console.log('Retrieved Prediction Data:', predictionData);

        // Extract dates and predictions
        const labels = predictionData.map(entry => entry.date);
        const openingData = predictionData.map(entry => entry.opening_prediction);
        const closingData = predictionData.map(entry => entry.closing_prediction);

        // Get the context of the canvas element we want to select
        var ctx = document.getElementById('myChart').getContext('2d');

        // Create a new Chart instance
        var myChart = new Chart(ctx, {
            type: 'line', // Specify the type of chart (line, bar, pie, etc.)
            data: {
                labels: labels, // Labels for the x-axis
                datasets: [
                    {
                        label: 'Opening Prediction',
                        data: openingData, // Data points for the chart
                        backgroundColor: 'rgb(101, 114, 160)', // Background color for the area under the line
                        borderColor: 'rgba(54, 162, 235, 1)', // Border color for the line
                        borderWidth: 1, // Width of the line
                        fill: true // Fill the area under the line
                    },
                    {
                        label: 'Closing Prediction',
                        data: closingData, // Data points for the chart
                        backgroundColor: 'rgb(136, 111, 156)', // Background color for the area under the line
                        borderColor: 'rgba(75, 192, 192, 1)', // Border color for the line
                        borderWidth: 1, // Width of the line
                        fill: true // Fill the area under the line
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false // Start the y-axis at zero (set to false to accommodate actual data range)
                    }
                }
            }
        });
    } else {
        console.error('No prediction data found in local storage.');
    }
});
