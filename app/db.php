<?php
    define("DB_SERVER", "localhost");
    define("DB_USER", "root");
    define("DB_PASSWORD", "");
    define("DB_NAME","candles");

    $mysqli = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME);
    if($mysqli->connect_error) {
        echo "We are having some difficulties\n";
        echo 'ERROR: '.$mysqli->connect_error.'\n';
        exit();
    }
    mysqli_query($mysqli, "INSERT INTO clients (vardas, email, message)
    VALUES('$_POST[vardas]', '$_POST[email]','$_POST[message]')");
    //navigate back to home page 
    ('Location : ../pages/pagrindinis.php');
    