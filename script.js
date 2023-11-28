function toggleTemperatureGraph() {
    var temperatureContent = document.getElementById("temperatureContent");
    var collapsible = document.querySelector("#temperatureSquare .collapsible");
    
    temperatureSquare.classList.toggle('graph-hovered');
    temperatureContent.style.display = (temperatureContent.style.display === "block") ? "none" : "block";
    collapsible.classList.toggle("active");
}

function toggleHumidityGraph() {
    var humidityContent = document.getElementById("humidityContent");
    var collapsible = document.querySelector("#humiditySquare .collapsible");

    humiditySquare.classList.toggle('graph-hovered');
    humidityContent.style.display = (humidityContent.style.display === "block") ? "none" : "block";
    collapsible.classList.toggle("active");
}