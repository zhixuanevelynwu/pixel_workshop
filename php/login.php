<?php 
    include('config.php');
    //$acntpath = '/home/zw1887/data/data_pixel';
    $acntpath = $path;

    // grab the username & password
    $username = $_POST['username'];
    $password = $_POST['password'];

    // open up the 'teacheraccounts.txt' file
    $data = file_get_contents($acntpath . '/accounts.txt');
    $data = trim($data);
    //print $data."<br>";
    $split_items = explode("\n", $data);

    // see if the supplied info matches what's in the file
    for ($i=0; $i<sizeof($split_items); $i++) {
        $info = explode(",", $split_items[$i]);
        if ($username == $info[0] && 
            $password == $info[1]) {
            // if everything is OK we will drop a cookie on their computer

            setcookie('loggedin', 'yes');
            setcookie('username', $info[0]);

            header('Location: index.php');
            exit();
        }
    }

    // if not, send them back to the 'admin.php'
    header('Location: index.php?loginerror=yes');
    exit();

?>