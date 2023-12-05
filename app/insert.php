<?php
$usuario = "root";
$contrasena = "";
$servidor = "localhost";
$basededatos = "sensor_db";

$conn = new mysqli($servidor, $usuario, $contrasena, $basededatos);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if temperature and humidity are set
    if (isset($_POST['temperature']) && isset($_POST['humidity'])) {
        $t = $_POST['temperature'];
        $h = $_POST['humidity'];

        // Use prepared statement to prevent SQL injection
        $sql = "INSERT INTO dht11 (temperature, humidity) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);

        // Bind parameters
        $stmt->bind_param("dd", $t, $h);

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Data inserted successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => $stmt->error]);
        }

        // Close the statement
        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Temperature and humidity not set in the POST request."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
