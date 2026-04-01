<?php
require "db.php";

$result = $connection->query("SELECT id, name, image, price FROM products ORDER BY id DESC");
$products = [];

while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

echo json_encode($products);
?>
