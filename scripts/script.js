function formatDateTime(timestamp) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return new Date(timestamp).toLocaleDateString(undefined, options);
}

async function fetchData() {
    try {
        const response = await fetch('http://192.168.1.91/ProyectoESP/retrieve.php');
        const data = await response.json();

        console.log('Received data:', data); // Add this line to log the received data

        if (data.status === 'success') {
            // Display sensor values
            document.getElementById('temperatureValue').textContent = data.data.temperature + ' °C';
            document.getElementById('humidityValue').textContent = data.data.humidity + ' %';

            // Update the last fetched timestamp
            const lastFetchedDateTime = formatDateTime(data.data.datetime);
            document.getElementById('lastFetchedDateTime').textContent = 'Last fetched: ' + lastFetchedDateTime;

            // Update the charts
            updateTemperatureChart(data.data.temperature);
            updateHumidityChart(data.data.humidity);
        } else {
            console.error('Error fetching data:', data.message);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


  
function updateData(data) {
const temperatureElement = document.getElementById('temperatureValue');
const humidityElement = document.getElementById('humidityValue');
const datetimeElement = document.getElementById('datetimeValue');

temperatureElement.textContent = data.temperature + ' °C';
humidityElement.textContent = data.humidity + ' %';
datetimeElement.textContent = 'Last update: ' + data.datetime;

console.log('Data updated successfully');
}

// Fetch data initially and set up periodic fetching
fetchData();
setInterval(fetchData, 5000); // Fetch data every 5 seconds