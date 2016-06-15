<?php
  // Header & connection
  header('Content-Type: application/json');

  $mysqli = new mysqli('##', '##', '##', '##');
  if($mysqli->connect_errno) {
    echo 'Connect failed';
  }

  // Perform query and push the data in an array
  $query = '##';
  $arr = array();
  $arrCards = array();

  if($result = $mysqli->query($query)) {
    while($row = $result->fetch_assoc()) {
      $arrCards[] = $row;
    }

    $result->free();
  }

  // Output & closing the connection
  $arr = array('cards' => $arrCards);
  echo json_encode($arr);

  $mysqli->close();
?>
