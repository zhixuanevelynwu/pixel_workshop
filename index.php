<?php
  include('config.php');
?>

<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8" />
    <title>Pixel Art Workspace</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
    <link type="text/css" href="styles.css" rel="stylesheet" />

    <script src="js/html2canvas.js"></script>
  </head>

  <body>
    <div id="container">
      <h1 id="title">Pixel Art Workspace</h1>
      <hr />

      <div id="content">
      <?php
        
        if ($_GET['loginerror']) {
          print "<p>Error logging in!</p>";
        }

        // check to see if they are logged in
        if ($_COOKIE['loggedin']=='yes') {
          print "<p id='welcome'>Welcome, " . $_COOKIE['username'] . "</p>";
      ?>
        <!-- SEE THIS WHILE LOGGED IN -->
        <div id="left">
          <!-- tools -->
          <button id="erase" class="tool">Erase</button>

          <button id="eraseAll" class="tool">Erase All</button>

          <button id="colorAll" class="tool">Fill</button>

          <button id="hidegrid" class="tool">Hide Grid</button>

          <button id="help" class="tool">Help</button>

          <!-- this one generates a random pixel image on the canvas -->
          <button id="fun" class="tool">Fun</button>
        </div>

        <div id="canvas">
          <!-- painter here -->
        </div>

        <div id="right">
          <!-- colors -->

          <div id="colors"></div>

          <p id="p-enter">Enter a color in HEX(eg. #76448A for purple):</p>
          <input
            type="mycolor"
            name="inputcolor"
            class="enter"
            value="#CACFD2"
          />
          <button class="getColor">Get Color</button>
        </div>

        <button id="downloader">Download!</button> 
        <button id="savecross">Save Your Work Cross Devices</button>
        <div id="savedcross"></div>
      </div>

      <a id = "logout" href="logout.php">Logout</a>

      <!-- FOOTER -->
      <div class="footer">
        <p>© 2020 Zhixuan Wu</p>
      </div>
    </div>


    <!-- bring in the jQuery library -->
    <script
      src="https://code.jquery.com/jquery-3.5.1.min.js"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.4.1/jspdf.debug.js"></script>

    <!-- bring in my own js -->
    <script type="text/javascript" src="js/canvas.js"></script>
    <script type="text/javascript" src="js/save.js"></script>
    <script>

          document.getElementById('downloader').onclick = function(event) {
            html2canvas(canvas).then(canvas => {
                let data = canvas.toDataURL()
                let a = document.createElement("a");
                console.log(data)
                //a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
                a.href = canvas.toDataURL("image/png");
                a.download = 'pixelart'+parseInt(Math.random()*1000)+'.png';
                a.click();
                
            });
          }

    </script>

    <?php
    } 

    if ($_COOKIE['loggedin']=='guest') {
    ?>
      <!-- GUEST VIEW -->
        <div id="left">
          <!-- tools -->
          <button id="erase" class="tool">Erase</button>

          <button id="eraseAll" class="tool">Erase All</button>

          <button id="colorAll" class="tool">Fill</button>

          <button id="hidegrid" class="tool">Hide Grid</button>

          <button id="help" class="tool">Help</button>

          <!-- this one generates a random pixel image on the canvas -->
          <button id="fun" class="tool">Fun</button>
        </div>

        <div id="canvas">
          <!-- painter here -->
        </div>

        <div id="right">
          <!-- colors -->

          <div id="colors"></div>

          <p id="p-enter">Enter a color in HEX(eg. #76448A for purple):</p>
          <input
            type="mycolor"
            name="inputcolor"
            class="enter"
            value="#CACFD2"
          />
          <button class="getColor">Get Color</button>
        </div>

        <button id="save">Save Your Work Locally</button>
        <div id="saved"></div>
      </div>

      <a id = "login" href="logout.php">Sign up or Login :)</a>

      <p id="gologin">
        <a href="logout.php">Sign up or login</a> to save your work cross devices and download your art!
      </p>

      <!-- FOOTER -->
      <div class="footer">
        <p>© 2020 Zhixuan Wu</p>
      </div>
    </div>

    <!-- bring in the jQuery library -->
    <script
      src="https://code.jquery.com/jquery-3.5.1.min.js"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
      crossorigin="anonymous"
    ></script>

    <!-- bring in my own js -->
    <script type="text/javascript" src="js/canvas.js"></script>
    <script>

      var mycanvas;
      myStorage = window.localStorage;
      if (window.localStorage.getItem("canvas")) {
        mycanvas = window.localStorage.getItem("canvas");

        let grids = mycanvas.trim().split("\n");
        console.log(grids);
        let allGrids = canvas.children;
        for (let i = 0; i < grids.length; i++) {
          allGrids[i].style.backgroundColor = grids[i];
          allGrids[i].dataset.color = grids[i];
        }
      }

    </script>

    <?php

    } 

    if ($_COOKIE['loggedin']=='signup') {
      if ($_GET['signupfailed']=='missing') {
        print "Please fill in all three fields.";
      }

      if ($_GET['signupfailed']=='password') {
        print "Please make sure to enter the same password twice.";
      }

      if ($_GET['signupfailed']=='username') {
        print "Oops, the username you chose is already in use. Try another one!";
      }

      if ($_GET['signupfailed']=='format') {
        print "Please make sure that your username contains only alphanumeric characters.";
      }

      if ($_GET['signupfailed']=='length') {
        print "Please make sure that your password is at least 6 characters long.";
      }

    ?>

    <!-- CREATE AN ACCOUNT HERE -->
    <div id="signuppage">
      <h3>Create an account</h3>

      <form action="signup.php" method="POST">
              Enter Your Username*: <br>
              <input type="text" class="signupinfo" name="newusername">
              <br>
              <br>
              Enter Your Password*: <br>
              <input type="password" class="signupinfo" name="newpassword">
              <br>
              <br>
              Enter Your Password Again*: <br>
              <input type="password" class="signupinfo" name="samepassword">
              <br>
              
              <br>
              <input type="submit" id="createbtn" value="Create your account!">
      </form>
      <br>
      <a id="backtolog" href="backtologin.php">Back to login</a>
    </div>

    <?php

    }
      
    if ($_COOKIE['loggedin']!='yes' && $_COOKIE['loggedin']!='guest' && $_COOKIE['loggedin']!='signup') {
      if ($_GET['signup']=='successful') {
        print "Hooray! Your account is created. Login and start creating!";
      }
    ?>
    <div id="loginpage">

      <form action="login.php" method="POST">
              <p id="u">Username</p> 
              <input type="text" name="username" id="username">
              <br>
              <p id="p">Password</p>
              <input type="password" name="password" id="password">
              <i class="far fa-eye" id="togglePassword" style="margin-left: -40px; cursor: pointer; color: black;"></i>
              <br>
              <br>
              <input type="submit" value="Login" id="loginbtn">
              <br>
              <br>
              <br>
              <a href="reg.php" id="signup">Sign up</a>
              <br>
              <br>
              <a href="guest.php" id="guest">Continue as a guest!</a>

              <p>© 2020 Zhixuan Wu</p>
      </form>

      <script src="js/app.js"></script>

    </div>

    <?php
    }
        
    ?>

  </body>
</html>
