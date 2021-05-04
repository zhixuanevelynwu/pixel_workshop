<?php
    //destroy all cookies
    setcookie('username', '', time()-3600);
    setcookie('loggedin', '', time()-3600);

    //send them back to admin.php
    header('Location: index.php?action=loggedout');
?>