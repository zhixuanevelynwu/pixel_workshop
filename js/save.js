// DOM references to our HTML elements
let allGrids = canvas.children;
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
let fname = getCookie("username") + ".txt";
//console.log(fname);

// jQuery document ready handler
// (all code should go inside of this function)
$(document).ready(function() {

  $.ajax ({
    type: 'GET',
    url: 'data/' + fname + '?nocache='+parseInt(Math.random()*10000),
    //url: '/home/zw1887/data/data_pixel/' + fname,
    data: {
    },
    success: function(data, status) {
      var colors = data.trim().split("\n");
      //console.log("success1");
      for (let i = 0; i < allGrids.length; i++) {
        allGrids[i].style.backgroundColor = colors[i];
        allGrids[i].dataset.color = colors[i];
      }
    }
  })
  
  document.getElementById('savecross').onclick = function(event) {
    let canvasInfo = "";
    for (let i = 0; i < allGrids.length; i++) {
        //let info = allGrids[i].dataset.color + "," + allGrids[i].dataset.x + "," + allGrids[i].dataset.y + "\n";
        let info = allGrids[i].dataset.color + "\n";
        canvasInfo += info;
    }

    $.ajax ({
      type: 'POST',
      url: 'savecanvas.php',
      data: {
        canvas: canvasInfo
      },
      //cache: parseInt(Math.random()*10000),
      success: function(data, status) {
        console.log("saved");
        let saved = document.createElement("div");
        let mystatus = document.getElementById("savedcross");

        while (mystatus.firstChild) {
          mystatus.removeChild(mystatus.firstChild);
        }

        var currentdate = new Date();
        let curtime =
          "Last Save: " +
          currentdate.getDate() +
          "/" +
          (currentdate.getMonth() + 1) +
          "/" +
          currentdate.getFullYear() +
          "  " +
          currentdate.getHours() +
          ":" +
          currentdate.getMinutes() +
          ":" +
          currentdate.getSeconds();
        saved.innerHTML = "Work saved! - " + curtime;
        saved.classList.add("saved");
        mystatus.appendChild(saved);
      }
    })
  }




})
