function initInputs() {
  // HANDLE NON-MOVEMENT BUTTONS
  document.getElementById("randomize").onclick = randomTurns;
  document.getElementById("save-state").onclick = saveState;
  document.getElementById("load-state").onclick = loadState;
  document.getElementById("load-state-browser").onclick = loadStateBrowser;

  // HANDLE MOVEMENT BUTTONS
  document.getElementById("1").onclick = function() {
    hold ? animationQueue.push(-1) : animationQueue.push(1);
  };
  document.getElementById("2").onclick = function() {
    hold ? animationQueue.push(-2) : animationQueue.push(2);
  };
  document.getElementById("3").onclick = function() {
    hold ? animationQueue.push(-3) : animationQueue.push(3);
  };
  document.getElementById("4").onclick = function() {
    hold ? animationQueue.push(-4) : animationQueue.push(4);
  };
  document.getElementById("5").onclick = function() {
    hold ? animationQueue.push(-5) : animationQueue.push(5);
  };
  document.getElementById("6").onclick = function() {
    hold ? animationQueue.push(-6) : animationQueue.push(6);
  };
  document.getElementById("7").onclick = function() {
    hold ? animationQueue.push(-7) : animationQueue.push(7);
  };
  document.getElementById("8").onclick = function() {
    hold ? animationQueue.push(-8) : animationQueue.push(8);
  };
  document.getElementById("9").onclick = function() {
    hold ? animationQueue.push(-9) : animationQueue.push(9);
  };
  return;
}

// ---------------------------------------------------------------------------------------------------
// PERFORM RANDOM TURNS
// ---------------------------------------------------------------------------------------------------
function randomTurns() {
  var input = document.getElementById("random-count").value;
  console.log(input);
  if (isNaN(input) || !input) {
    alert("Error: The value specified is not a valid input.");
    return;
  } else if (input > 9999 || input < 0) {
    alert("Error: The value specified is out of range (0 - 9999).");
    return;
  } else if (animationQueue.length != 0) {
    alert("Error: There are moves in progress. Please wait.");
    return;
  }
  var turn, previousTurn;
  for (i = 0; i < input; i++) {
    while (1) {
      turn = 9 - Math.round(Math.random() * 18);
      if (turn != 0 && turn != previousTurn * -1) {
        break;
      }
    }
    animationQueue.push(turn);
    previousTurn = turn;
  }
}

// ---------------------------------------------------------------------------------------------------
// SAVE STATE TO TEXT AND LOCAL STORAGE (kindof like a cookie)
// ---------------------------------------------------------------------------------------------------
function saveState() {
  var state = JSON.stringify(cubePosition);
  document.getElementById("state").value = state;
  window.localStorage.setItem("cube-state", state);
  return;
}

// ---------------------------------------------------------------------------------------------------
// LOAD STATE FROM TEXT
// ---------------------------------------------------------------------------------------------------
function loadState() {
  var state = document.getElementById("state").value;
  var fileContent = JSON.parse(state);
  var x, y, z;
  for (x = 0; x < 3; x++) {
    for (y = 0; y < 3; y++) {
      for (z = 0; z < 3; z++) {
        fileContent[x][y][z][4].matrix = true;
      }
    }
  }
  cubePosition = fileContent.slice();
  return;
}

// ---------------------------------------------------------------------------------------------------
// LOAD STATE FROM BROWSER STORAGE
// ---------------------------------------------------------------------------------------------------
function loadStateBrowser() {
  var state = window.localStorage.getItem("cube-state");
  var fileContent = JSON.parse(state);
  var x, y, z;
  for (x = 0; x < 3; x++) {
    for (y = 0; y < 3; y++) {
      for (z = 0; z < 3; z++) {
        fileContent[x][y][z][4].matrix = true;
      }
    }
  }
  cubePosition = fileContent.slice();
  return;
}

// ---------------------------------------------------------------------------------------------------
// UPDATE STATUES OF THE SOLVE
// ---------------------------------------------------------------------------------------------------
function updateStatus(status) {
  document.getElementById("status").innerHTML = status;
  return;
}
