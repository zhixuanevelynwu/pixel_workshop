<?php
    setcookie('loggedin', 'guest');

    header('Location: index.php');
    exit();
?>