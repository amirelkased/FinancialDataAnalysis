document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the prediction data from local storage
    const storedData = localStorage.getItem('Marketindicators');

    if (storedData) {
        try {
            // Parse the JSON data
            const marketIndicators = JSON.parse(storedData);
            console.log('Retrieved Prediction Data:', marketIndicators);

            // Extract data for best and worst companies
            const bestCompaniesData = marketIndicators.profits.slice(0, 5);
            const worstCompaniesData = marketIndicators.losses.slice(0, 5);

            // Extract company names and ranks
            const bestCompanyNames = bestCompaniesData.map(entry => entry.name);
            const bestCompanyRanks = bestCompaniesData.map(entry => entry.rank);
            const worstCompanyNames = worstCompaniesData.map(entry => entry.name);
            const worstCompanyRanks = worstCompaniesData.map(entry => entry.rank);
            

            // Data for the best companies chart
            const bestCompaniesChart = {
                x: bestCompanyNames,
                y: bestCompanyRanks,
                type: 'bar',
                name: 'Up Indicators',
                marker: {
                    color: 'rgb(112, 94, 128)',
                    line: {
                        color: 'rgb(85, 106, 131)',
                        width: 1
                    }
                }
            };

            // Data for the worst companies chart
            const worstCompaniesChart = {
                x: worstCompanyNames,
                y: worstCompanyRanks,
                type: 'bar',
                name: 'Down Indicators',
                marker: {
                    color: 'rgb(85, 106, 131)',
                    line: {
                        color: 'rgb(112, 94, 128)',
                        width: 1
                    }
                }
            };

            // Layout for the best companies chart
            const bestLayout = {
                title: {
                    text: 'Up Indicators',
                    font: {
                        size: 20, // Set title font size to 15
                        color: 'rgb(112, 94, 128)' // Set title font color
                    }
                },
                xaxis: {
                    title: {
                        text: 'Company',
                        standoff: 20 // Add space between tick labels and axis title
                    },
                    tickangle: -25, // Rotate the text to be diagonal
                    tickfont: {
                        size: 13,
                    },
                    tickpadding: 5 ,// Add padding to the tick labels
                    color: 'rgb(112, 48, 59)'
                },
                yaxis: {
                    title: 'Rank',
                    color: 'rgb(112, 48, 59)'
                },
                margin: {
                    l: 50,
                    r: 50,
                    b: 150, // Increase bottom margin to accommodate diagonal labels
                    t: 50,
                    pad: 10
                }
            };

            // Layout for the worst companies chart
            const worstLayout = {
                title: {
                    text: 'Down Indicators',
                    font: {
                        size: 20, // Set title font size to 15
                        color: 'rgb(85, 106, 131)' // Set title font color
                    }
                },
                xaxis: {
                    title: {
                        text: 'Company',
                        standoff: 20 // Add space between tick labels and axis title
                    },
                    tickangle: -25, // Rotate the text to be diagonal
                    tickfont: {
                        size: 13,
                    },
                    tickpadding: 5 ,// Add padding to the tick labels
                    color: 'rgb(99, 64, 85)'
                },
                yaxis: {
                    title: 'Rank',
                    color: 'rgb(99, 64, 85)' // Set title font color
                },
                margin: {
                    l: 50,
                    r: 50,
                    b: 150, // Increase bottom margin to accommodate diagonal labels
                    t: 50,
                    pad: 10
                }
            };

            // Function to render a chart
            function renderChart(elementId, data, layout) {
                Plotly.newPlot(elementId, [data], layout);
            }

            // Render the best companies chart
            renderChart('bestCompanies', bestCompaniesChart, bestLayout);

            // Render the worst companies chart
            renderChart('worstCompanies', worstCompaniesChart, worstLayout);

        } catch (error) {
            console.error('Error parsing or processing data:', error);
        }

    } else {
        console.error('No Market indicators data found in local storage.');
    }
});
