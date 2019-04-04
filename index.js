var canvas;
var gl;
var program;
var cBuffer;
var vColor;
// ---------------------------------------------------------------------------------------------------
// MAIN FUNCTION
// ---------------------------------------------------------------------------------------------------
window.onload = function init() {
  canvas = document.getElementById("glCanvas");

  // CODE FOR GETTING RIGHT WINDOW SIZE
  canvas.width = window.innerWidth * 0.4;
  canvas.height = window.innerHeight * 0.65;

  initListeners(canvas);
  initInputs();
  // Set up WebGL
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) {
    alert("WebGL isn't available");
  }

  //  Clear the viewport
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.95, 0.95, 1, 1.0);

  // Activates depth comparisons and updates to the depth buffer
  gl.enable(gl.DEPTH_TEST);

  // Load the Shaders
  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // array element buffer
  var iBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint8Array(indices),
    gl.STATIC_DRAW
  );

  // color array attribute buffer
  cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

  vColor = gl.getAttribLocation(program, "vColor");
  gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vColor);

  // vertex array attribute buffer
  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

  var _vPosition = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(_vPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(_vPosition);

  // get locations of uniforms
  projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");
  modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");

  fillCubePositions();
  render();
};

// ---------------------------------------------------------------------------------------------------
// DISCOLORATION FUNCTION
// making sure the insides are black-ish
// ---------------------------------------------------------------------------------------------------
var blackish = vec4(0.0, 0.0, 0.0, 0.9);
function discolor(x, y, z) {
  // Restore all colors to vertexColors
  for (i = 0; i < vertexColors.length; i++) {
    vertexColors[i] = startingVertexColors[i];
  }
  if (x != -1) {
    darken(8);
  }
  if (x != 1) {
    darken(12);
  }
  if (y != -1) {
    darken(16);
  }
  if (y != 1) {
    darken(20);
  }
  if (z != -1) {
    darken(0);
  }
  if (z != 1) {
    darken(4);
  }

  function darken(index) {
    for (i = index; i < index + 4; i++) {
      vertexColors[i] = blackish;
    }
  }
}

// ---------------------------------------------------------------------------------------------------
// RENDER FUNCTION
// ---------------------------------------------------------------------------------------------------
function render() {
  if (animationQueue.length != 0 && !isAnimating) {
    animate(animationQueue.shift());
    isAnimating = true;
  }

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Set the camera position at each render
  eye = vec3(
    cameraRadius * Math.sin(PHI) * Math.sin(THETA),
    cameraRadius * Math.cos(PHI),
    cameraRadius * Math.sin(PHI) * Math.cos(THETA)
  );

  projectionViewMatrix = perspective(fovy, aspect, near, far);
  modelViewMatrix = lookAt(eye, at, up);

  var x, y, z;
  for (x = -1; x <= 1; x++) {
    for (y = -1; y <= 1; y++) {
      for (z = -1; z <= 1; z++) {
        if (x != 0 || y != 0 || z != 0) {
          var tempmodelViewMatrix = modelViewMatrix;

          modelViewMatrix = mult(modelViewMatrix, getRotationMatrix(x, y, z));
          modelViewMatrix = mult(
            modelViewMatrix,
            translate(vec3(x * spacing, y * spacing, z * spacing))
          );
          discolor(x, y, z);

          cBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);

          vColor = gl.getAttribLocation(program, "vColor");
          gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
          gl.enableVertexAttribArray(vColor);

          gl.uniformMatrix4fv(
            projectionMatrixLoc,
            false,
            flatten(projectionViewMatrix)
          );
          gl.uniformMatrix4fv(
            modelViewMatrixLoc,
            false,
            flatten(modelViewMatrix)
          );
          gl.drawElements(gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0);

          modelViewMatrix = tempmodelViewMatrix;
        }
      }
    }
  }
  requestAnimFrame(render);
}
