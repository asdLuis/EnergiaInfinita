<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$usuario = "root";
$contrasena = "";
$servidor = "localhost";
$basededatos = "sensor_db";

$conn = new mysqli($servidor, $usuario, $contrasena, $basededatos);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Fetch the latest record from the database
$sql = "SELECT * FROM dht11 ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(["status" => "success", "data" => $row]);
} else {
    echo json_encode(["status" => "error", "message" => "No data found in the database"]);
}
?>
