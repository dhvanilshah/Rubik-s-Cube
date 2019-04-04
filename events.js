var hold = false;

function initListeners(canvas) {
  // TESTING CODE
  function printAngles() {
    var theta = degrees(THETA) % 360;
    var phi = degrees(PHI) % 360;
    console.log(theta, phi);
  }

  //   WINDOW RESIZE LITENER
  window.addEventListener("resize", e => {
    canvas.width = window.innerWidth * 0.4;
    canvas.height = window.innerHeight * 0.65;
  });

  //   START LISTENING FOR MOUSE MOVEMENTS
  var rotating = false;
  var previous_x, previous_y;

  function startRotation(e) {
    e.preventDefault();
    rotating = true;
    previous_x = e.pageX;
    previous_y = e.pageY;
    return;
  }

  function endRotation(e) {
    e.preventDefault();
    rotating = false;
    return;
  }

  function rotate(e) {
    e.preventDefault();
    if (!rotating) return;

    var dx = e.pageX - previous_x;
    var dy = e.pageY - previous_y;

    applyCameraRotation(dx, dy);

    previous_x = e.pageX;
    previous_y = e.pageY;
  }

  canvas.addEventListener("mousedown", startRotation, false);
  canvas.addEventListener("mouseup", endRotation, false);
  canvas.addEventListener("mouseout", endRotation, false);
  canvas.addEventListener("mousemove", rotate, false);
  //   END LISTENNING FOR MOUSE MOVEMENTS
  document.onkeypress = function(e) {
    if (event.keyCode == 32) {
      e.preventDefault();
      hold = true;
      console.log(hold);
    }
  };

  document.onkeyup = function(e) {
    e.preventDefault();
    if (event.keyCode == 32) {
      hold = false;
      console.log(hold);
    }
  };

  //   START LISTENING FOR KEYBOARD EVENTS
  document.onkeydown = function(e) {
    if (event.keyCode == 37) {
      // left
      applyCameraRotation(-10, 0);
    } else if (event.keyCode == 38) {
      // up
      applyCameraRotation(0, 10);
    } else if (event.keyCode == 39) {
      // right
      applyCameraRotation(10, 0);
    } else if (event.keyCode == 40) {
      // down
      applyCameraRotation(0, -10);
    } else if (event.keyCode == 27) {
      animationQueue = [];
    } else if (event.keyCode == 87) {
      hold ? animationQueue.push(-4) : animationQueue.push(-1);
    } else if (event.keyCode == 69) {
      hold ? animationQueue.push(-7) : animationQueue.push(-2);
    } else if (event.keyCode == 82) {
      hold ? animationQueue.push(4) : animationQueue.push(-3);
    } else if (event.keyCode == 83) {
      hold ? animationQueue.push(-5) : animationQueue.push(7);
    } else if (event.keyCode == 68) {
      hold ? animationQueue.push(-8) : animationQueue.push(8);
    } else if (event.keyCode == 70) {
      hold ? animationQueue.push(5) : animationQueue.push(9);
    } else if (event.keyCode == 88) {
      hold ? animationQueue.push(-6) : animationQueue.push(1);
    } else if (event.keyCode == 67) {
      hold ? animationQueue.push(-9) : animationQueue.push(2);
    } else if (event.keyCode == 86) {
      hold ? animationQueue.push(6) : animationQueue.push(3);
    }
  };
  //   END LISTENING FOR KEYBOARD EVENTS
}

function applyCameraRotation(dx, dy) {
  if (isAnimating == true) {
    return; //dont do anything if animation is going on because that will mess up the cube
  }
  var absPhi = Math.abs(degrees(PHI) % 360);

  if ((absPhi > 180.0 && absPhi < 270.0) || PHI < 0.0) {
    if (degrees(PHI) % 360 < -180.0) {
      up = vec3(0.0, 1.0, 0.0);
      THETA += (-dx * 2 * Math.PI) / canvas.width;
    } else {
      up = vec3(0.0, -1.0, 0.0);
      THETA += (dx * 2 * Math.PI) / canvas.width;
    }
  } else {
    if (absPhi > 270.0) {
      up = vec3(0.0, -1.0, 0.0);
      THETA += (dx * 2 * Math.PI) / canvas.width;
    } else {
      up = vec3(0.0, 1.0, 0.0);
      THETA += (-dx * 2 * Math.PI) / canvas.width;
    }
  }

  PHI += (-dy * 2 * Math.PI) / canvas.height;
  getPositions();
}
