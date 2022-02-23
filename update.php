<?php
require "./database.php";

$statement=$db->prepare("SELECT * FROM users");
$statement->execute();
$users = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($users);