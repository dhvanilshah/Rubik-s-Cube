// Scaling for vertices
var s = 0.97;
// Spacing for cubies
var spacing = 2.05;

// For the drawElements() function
var numVertices = 36;

// Location to and actual matrices
var projectionMatrixLoc, modelViewMatrixLoc;
var modelViewMatrix, projectionMatrix;

var eye = vec3(0.0, 0.0, 4.0);
var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);

var cameraRadius = 20.0;
var cameraRadiusMinimum = 12.5;
var cameraRadiusMaximum = 50.0;
var THETA = radians(20);
var PHI = radians(70);

var fovy = 45.0; // Field-of-view in Y direction angle (in degrees)
var aspect = 1.0; // Viewport aspect ratio
var near = 0.3;
var far = 30;

// Defining vertices
var vertices = [
  vec3(-s, -s, -s),
  vec3(s, -s, -s),
  vec3(s, s, -s),
  vec3(-s, s, -s),
  vec3(-s, -s, s),
  vec3(s, -s, s),
  vec3(s, s, s),
  vec3(-s, s, s),
  vec3(-s, -s, -s),
  vec3(-s, s, -s),
  vec3(-s, s, s),
  vec3(-s, -s, s),
  vec3(s, -s, -s),
  vec3(s, s, -s),
  vec3(s, s, s),
  vec3(s, -s, s),
  vec3(-s, -s, -s),
  vec3(-s, -s, s),
  vec3(s, -s, s),
  vec3(s, -s, -s),
  vec3(-s, s, -s),
  vec3(-s, s, s),
  vec3(s, s, s),
  vec3(s, s, -s)
];

// Defining colors for the above vertices
// Define startingVertexColors and vertexColors

var startingVertexColors = [
  // Must be composed of 24 vec4s
  // corresponds to the 24 individual vertices (4 for each of 6 faces)

  // Back Face - GREEN
  vec4(0.0, 1.0, 0.0, 1.0),
  vec4(0.0, 1.0, 0.0, 1.0),
  vec4(0.0, 1.0, 0.0, 1.0),
  vec4(0.0, 1.0, 0.0, 1.0),

  // Front Face - BLUE
  vec4(0.0, 0.0, 1.0, 1.0),
  vec4(0.0, 0.0, 1.0, 1.0),
  vec4(0.0, 0.0, 1.0, 1.0),
  vec4(0.0, 0.0, 1.0, 1.0),

  // Left Face - ORANGE
  vec4(1.0, 0.5, 0.0, 1.0),
  vec4(1.0, 0.5, 0.0, 1.0),
  vec4(1.0, 0.5, 0.0, 1.0),
  vec4(1.0, 0.5, 0.0, 1.0),

  // Right Face - RED
  vec4(1.0, 0.0, 0.0, 1.0),
  vec4(1.0, 0.0, 0.0, 1.0),
  vec4(1.0, 0.0, 0.0, 1.0),
  vec4(1.0, 0.0, 0.0, 1.0),

  // Bottom Face - WHITE
  vec4(1.0, 1.0, 1.0, 1.0),
  vec4(1.0, 1.0, 1.0, 1.0),
  vec4(1.0, 1.0, 1.0, 1.0),
  vec4(1.0, 1.0, 1.0, 1.0),

  // Top Face - YELLOW
  vec4(1.0, 1.0, 0.0, 1.0),
  vec4(1.0, 1.0, 0.0, 1.0),
  vec4(1.0, 1.0, 0.0, 1.0),
  vec4(1.0, 1.0, 0.0, 1.0)
];
var vertexColors = [
  // Must be composed of 24 vec4s
  // corresponds to the 24 individual vertices (4 for each of 6 faces)

  // Back Face - GREEN
  vec4(0.0, 1.0, 0.0, 1.0),
  vec4(0.0, 1.0, 0.0, 1.0),
  vec4(0.0, 1.0, 0.0, 1.0),
  vec4(0.0, 1.0, 0.0, 1.0),

  // Front Face - BLUE
  vec4(0.0, 0.0, 1.0, 1.0),
  vec4(0.0, 0.0, 1.0, 1.0),
  vec4(0.0, 0.0, 1.0, 1.0),
  vec4(0.0, 0.0, 1.0, 1.0),

  // Left Face - ORANGE
  vec4(1.0, 0.5, 0.0, 1.0),
  vec4(1.0, 0.5, 0.0, 1.0),
  vec4(1.0, 0.5, 0.0, 1.0),
  vec4(1.0, 0.5, 0.0, 1.0),

  // Right Face - RED
  vec4(1.0, 0.0, 0.0, 1.0),
  vec4(1.0, 0.0, 0.0, 1.0),
  vec4(1.0, 0.0, 0.0, 1.0),
  vec4(1.0, 0.0, 0.0, 1.0),

  // Bottom Face - WHITE
  vec4(1.0, 1.0, 1.0, 1.0),
  vec4(1.0, 1.0, 1.0, 1.0),
  vec4(1.0, 1.0, 1.0, 1.0),
  vec4(1.0, 1.0, 1.0, 1.0),

  // Top Face - YELLOW
  vec4(1.0, 1.0, 0.0, 1.0),
  vec4(1.0, 1.0, 0.0, 1.0),
  vec4(1.0, 1.0, 0.0, 1.0),
  vec4(1.0, 1.0, 0.0, 1.0)
];

// Defining indices for the above vertexes
var indices = [
  0,
  1,
  2,
  0,
  2,
  3, // front
  4,
  5,
  6,
  4,
  6,
  7, // back
  8,
  9,
  10,
  8,
  10,
  11, // left
  12,
  13,
  14,
  12,
  14,
  15, // right
  16,
  17,
  18,
  16,
  18,
  19, // bottom
  20,
  21,
  22,
  20,
  22,
  23 // top
];

// MOVES CONVERSION CHART
// Provides move parameters for all 18 possible moves
// of the 9 planes of the cube
//
// Format of the chart:
// MOVE | VALUE
//
// LEFT COLUMN BACK | -1
// LEFT COLUMN FORWARD | 1
// MIDDLE COLUMN BACK | -2
// MIDDLE COLUMN FORWARD | 2
// RIGHT COLUMN BACK | -3
// RIGHT COLUMN FORWARD | 3
//
// TOP ROW LEFT | -4
// TOP ROW RIGHT | 4
// MIDDLE ROW LEFT | -5
// MIDDLE ROW RIGHT | 5
// BOTTOM ROW LEFT | -6
// BOTTOM ROW RIGHT | 6
//
// FRONT FACE CCW | -7
// FRONT FACE CW | 7
// CENTER FACE CCW | -8
// CENTER FACE CW | 8
// BACK FACE CCW | -9
// BACK FACE CW | 9
