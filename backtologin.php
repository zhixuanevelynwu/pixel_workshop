<?php
    setcookie('loggedin', '', time()-3600);

    //send them back to admin.php
    header('Location: index.php');
?>