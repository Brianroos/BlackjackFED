<?php
  // Header & connection
  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');

  $mysqli = new mysqli('##', '##', '##', '##');
  if($mysqli->connect_errno) {
    echo 'Connect failed';
  }

  // Perform query and push the data in an array
  $query = '##';
  $arrCards = array();

  if($result = $mysqli->query($query)) {
    while($row = $result->fetch_assoc()) {
      $arrCards[] = $row;
    }

    $result->free();
  }

  // Output & closing the connection
  echo json_encode($arrCards);

  $mysqli->close();
?>
