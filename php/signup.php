<?php 
    include('config.php');
    //$acntpath = '/home/zw1887/data/data_pixel';
    $acntpath = $path;

    // grab the username & password
    $newusername = $_POST['newusername'];
    $newpassword = $_POST['newpassword'];
    $samepassword = $_POST['samepassword'];

    // check if all three fields have been filled out
    if ($newpassword && $newusername && $samepassword) {
        
        if (!ctype_alnum($newusername)) {
            header('Location: index.php?signupfailed=format');
            exit();
        }
    
        if (strlen($newpassword) < 6) {
            header('Location: index.php?signupfailed=length');
            exit();
        }

        if ($newpassword == $samepassword) {
            $data = file_get_contents($acntpath . '/accounts.txt');
            $data = trim($data);
            $split_items = explode("\n", $data);

            // see if the username is already been used
            for ($i=0; $i<sizeof($split_items); $i++) {
                $info = explode(",", $split_items[$i]);
                if ($newusername == $info[0] ) {
                    header('Location: index.php?signupfailed=username');
                    exit();
                }
            }

            // put information into accounts.txt
            $myinfo = $newusername . "," . $newpassword . "\n";
            $data = file_put_contents($acntpath . '/accounts.txt', $myinfo, FILE_APPEND);
            // redirect user to login
            setcookie('loggedin', '', time()-3600);
            header('Location: index.php?signup=successful');
            exit();
        } else {
            header('Location: index.php?signupfailed=password');
            exit();
        }
    }

    // if not, send them back to the 'index.php'
    header('Location: index.php?signupfailed=missing');
    exit();

?>