<?php

  // include the file path for the data folder
  include('config.php');
  $userfile = "/" . $_COOKIE['username'] . ".txt";

  // set up a variable to point to the correct filename in this folder
  $filename = $path . $userfile;
  $myfile = fopen($filename, "rwx");

  // grab the incoming color value from the AJAX request
  $canvas = trim($_POST['canvas']);

  // if we have a color go ahead and add it to our data file
  if ($canvas) {
    file_put_contents($filename, $canvas);
    print "success";
    exit();
  }
  else {
    print "missing_data";
    exit();
  }

 ?>
