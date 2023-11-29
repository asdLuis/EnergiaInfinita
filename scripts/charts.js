// Initialize chart data arrays
const temperatureData = [];
const humidityData = [];

// Create the temperature chart
const temperatureChart = new Chart('temperatureChart', {
    type: 'line',
    data: {
        labels: [], // Empty labels array for now
        datasets: [{
            label: 'Temperature (°C)',
            data: temperatureData,
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
        }]
    }
});

// Create the humidity chart
const humidityChart = new Chart('humidityChart', {
    type: 'line',
    data: {
        labels: [], // Empty labels array for now
        datasets: [{
            label: 'Humidity (%)',
            data: humidityData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }
});

function updateTemperatureChart(newTemperature) {
    // Update temperature data array
    temperatureData.push(newTemperature);

    // Update labels (e.g., timestamp)
    temperatureChart.data.labels.push(new Date().toLocaleTimeString());

    // Redraw the chart
    temperatureChart.update();
}

function updateHumidityChart(newHumidity) {
    // Update humidity data array
    humidityData.push(newHumidity);

    // Update labels (e.g., timestamp)
    humidityChart.data.labels.push(new Date().toLocaleTimeString());

    // Redraw the chart
    humidityChart.update();
}
