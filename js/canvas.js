function download(){
  document.getElementById("downloader").download = "image.png";
  document.getElementById("downloader").href = document.getElementById("canvas").toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
}

var container = document.getElementById("container");
var canvas = document.getElementById("canvas");
var left = document.getElementById("left");
var right = document.getElementById("right");
var colors = document.getElementById("colors");
var erase = document.getElementById("erase");
var hideGrid = document.getElementById("hidegrid");

var icon = document.createElement("img");
icon.src = "images/erase.png";
erase.appendChild = icon;

/* SET UP RIGHT COLOR SELECTION PANEL */
var colorArray = [
  "black","white","#f7e9e9",
  "#A9CCE3","#5499C7","#2471A3",
  "#1F618D","#154360","#D4EFDF",
  "#7DCEA0","#27AE60","#229954",
  "#1E8449","#145A32","#FEF9E7",
  "#FCF3CF","#F9E79F","#F4D03F",
  "#F1C40F","#B7950B","#8a8383",
  "yellow","#FFC300","#FF5733",
  "#e0c1c1","#FFA07A","#900C3F",
  "#CD5C5C","#F08080","#FA8072",
  "#E9967A","#784212","#581845",
];

//colorAll button
var fill = 0;
var colorAll = document.getElementById("colorAll");
colorAll.onclick = function (event) {
  //console.log(fill, colorAll.classList);
  if (fill == 0) {
    colorAll.classList.add("fill");
    fill = 1;
  } else if (fill == 1) {
    colorAll.classList.remove("fill");
    fill = 0;
  }
};

var currentColor;
let nC = 13 * 3 - 6;
for (let i = 0; i < nC; i++) {
  var color = document.createElement("div");
  color.classList.add("color");
  color.style.backgroundColor = colorArray[i];
  colors.appendChild(color);
  //console.log(color);
  color.onclick = function (event) {
    let currentOrange = document.querySelectorAll(".orange");
    for (let j = 0; j < currentOrange.length; j++) {
      currentOrange[j].classList.remove("orange");
    }
    event.currentTarget.classList.add("orange");
    currentColor = event.currentTarget.style.backgroundColor;
  };

  /* ERASE BUTTON */
  erase.onclick = function (event) {
    currentColor = "rgba(245, 245, 245, 0.424)";
  };
}

// Get Color button
var getColor = document.querySelector(".getColor");
var enter = document.querySelector(".enter");
getColor.onclick = function (event) {
  let inputColor = enter.value;
  //console.log(inputColor);
  enter.style.backgroundColor = inputColor;
  if (inputColor) {
    currentColor = inputColor;
  }
};

/* SET UP CANVAS */
var x = 0;
var y = 0;
//var gridSize = 14*14;
var gridSize = 28 * 28;
for (let j = 0; j < gridSize; j++) {
  /* CREATE GRIDS */
  var grid = document.createElement("div");
  if (gridSize == 14 * 14) {
    grid.setAttribute("style", "width: 50px; height: 50px;");
  } else if (gridSize == 28 * 28) {
    grid.setAttribute("style", "width: 25px; height: 25px;");
  }
  grid.style.float = "left";
  grid.style.boxSizing = "border-box";
  grid.classList.add("grid");

  var controlVar = 0;
  if (window.localStorage.getItem("grid") == null || window.localStorage.getItem("grid") == "show") {
    grid.classList.add("border");
  } else {
    controlVar = 1;
    hideGrid.innerHTML = "Show Grid";
  }

  /* SET COORDINATE */
  grid.dataset.x = x++ % 14;
  grid.dataset.y = parseInt(y++ / 14);
  grid.dataset.color = "rgba(245, 245, 245, 0.424)";

  canvas.appendChild(grid);

  var mouseisdown = 0;
  grid.onmousedown = function (event) {
    // fill feature
    var prevColor;
    if (fill == 1) {
      if (event.currentTarget.dataset.color) {
        prevColor = event.currentTarget.dataset.color;
      } else {
        prevColor = "whitesmoke";
      }

      let allGrids = canvas.children;

      for (let i = 0; i < allGrids.length; i++) {
        /*console.log(
          prevColor,
          allGrids[i].style.backgroundColor,
          allGrids[i].dataset.color
        );*/
        if (allGrids[i].dataset.color == prevColor) {
          allGrids[i].style.backgroundColor = currentColor;
          allGrids[i].dataset.color = currentColor;
        }
      }
    }

    mouseisdown = 1;
    event.currentTarget.style.backgroundColor = currentColor;
    event.currentTarget.dataset.color = currentColor;
    //console.log("x: ", event.currentTarget.dataset.x);
    //console.log("y: ", event.currentTarget.dataset.y);
  };

  grid.onmouseover = function (event) {
    //console.log(mouseisdown);
    if (mouseisdown == 1) {
      event.currentTarget.style.backgroundColor = currentColor;
      event.currentTarget.dataset.color = currentColor;
    }
  };

  document.querySelector("body").onmouseup = function (event) {
    mouseisdown = 0;
  };

  canvas.onmouseout = function (event) {
    //mouseisdown = 0;
    //console.log(canvas);
    var e = event.toElement || event.relatedTarget;
    if (e!=null) {
      if (e.parentNode == this || e == this) {
        return;
      }
    }

    mouseisdown = 0;
  };

  canvas.ondbclick = function(event) {
    mouseisdown = 0;
  }

  canvas.ondrag = function(event) {
    mouseisdown = 0;
  }
  
}

/* SET UP LEFT TOOL BAR */
var eraseAll = document.getElementById("eraseAll");
eraseAll.onclick = function (event) {
  let allGrids = canvas.children;
  for (let i = 0; i < allGrids.length; i++) {
    allGrids[i].style.backgroundColor = "rgba(245, 245, 245, 0.424)";
    allGrids[i].dataset.color = "rgba(245, 245, 245, 0.424)";
  }
};

//var controlVar = 0;
hideGrid.onclick = function (event) {
  let allGrids = canvas.children;
  if (controlVar == 0) {
    for (let i = 0; i < allGrids.length; i++) {
      allGrids[i].classList.remove("border");
    }
    hideGrid.innerHTML = "Show Grid";
    controlVar = 1;
    window.localStorage.setItem("grid", "hide");
  } else if (controlVar == 1) {
    for (let i = 0; i < allGrids.length; i++) {
      allGrids[i].classList.add("border");
    }
    hideGrid.innerHTML = "Hide Grid";
    controlVar = 0;
    window.localStorage.setItem("grid", "show");
  }
};

var help = document.getElementById("help");
var created = 0;
var help_clicked = 0;
var guide = document.createElement("div");
help.onclick = function (event) {
  if (help_clicked==0) {
    help.style.backgroundColor = "grey";
    help.style.color = "white";
    help.innerHTML = "Hide";
    help_clicked = 1;
    if (!created) {
      guide.classList.add("guide");

      /*let cancel = document.createElement("button");
      cancel.classList.add("cancel");
      cancel.innerHTML = "&#10006;";
      guide.appendChild(cancel);

      cancel.onclick = function (event) {
        help.style.backgroundColor = "white";
        help.style.color = "rgb(80, 48, 35)";
        guide.classList.add("hidden");
        console.log("cancel");
      };*/

      let intro = document.createElement("div");
      intro.classList.add("intro");
      intro.innerHTML =
        "Hello User, <br> <br>You are using a Pixel Art creation tool. Select a color on the right panel and click on the canvas to create your artwork. <br> <br>To view your final work, click on 'Hide Grid'. <br> <br>If you need some inspiration before start, try the 'Fun' button below... <br> <br>Have fun:)";
      guide.appendChild(intro);
      container.appendChild(guide);
      created = 1;
    } else {
      guide.classList.remove("hidden");
    }
  } else {
    help_clicked = 0;
    help.style.backgroundColor = "white";
    help.style.color = "rgb(80, 48, 35)";
    help.innerHTML = "Help";
    guide.classList.add("hidden");
  }
};

//Fun button
var fun = document.getElementById("fun");
fun.onclick = function (event) {
  let allGrids = canvas.children;
  for (let i = 0; i < allGrids.length; i++) {
    randColor = colorArray[parseInt(Math.random() * colorArray.length)];
    allGrids[i].style.backgroundColor = randColor;
    allGrids[i].dataset.color = randColor;
  }
};

var mycanvas;
myStorage = window.localStorage;


var savebtn = document.getElementById("save");
var mystatus = document.getElementById("saved");

if (savebtn) {
savebtn.onclick = function (event) {
  let canvasInfo = "";
  let allGrids = canvas.children;
  for (let i = 0; i < allGrids.length; i++) {
    //let info = allGrids[i].dataset.color + "," + allGrids[i].dataset.x + "," + allGrids[i].dataset.y + "\n";
    let info = allGrids[i].dataset.color + "\n";
    canvasInfo += info;
  }
  window.localStorage.setItem("canvas", canvasInfo);

  while (mystatus.firstChild) {
    mystatus.removeChild(mystatus.firstChild);
  }

  //console.log(canvasInfo);
  let saved = document.createElement("div");
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
};
}

