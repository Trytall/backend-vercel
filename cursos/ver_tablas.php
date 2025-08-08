<?php
$hostname = "localhost";
$database = "c1940244_iades22";
$username = "c1940244_iades22";
$password = "hrkDGEPZc5";

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$result = $conn->query("SHOW TABLES");

if ($result->num_rows > 0) {
    echo "Tablas en la base de datos '$database':<br>";
    while ($row = $result->fetch_array()) {
        echo $row[0] . "<br>";
    }
} else {
    echo "No hay tablas.";
}

$conn->close();
?>