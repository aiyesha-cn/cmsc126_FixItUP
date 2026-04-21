<?php 

$conn = new mysqli('localhost', 'root', '', 'fixitup_db');

if ($conn->connect_error){
 die("Connection_failed: " . $conn->connect_error);
}

?>