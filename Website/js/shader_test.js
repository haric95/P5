let theShader;

function preload() {
  theShader = loadShader(
    "http://127.0.0.1:8887/shaders/one_color.vert",
    "http://127.0.0.1:8887/shaders/one_color.frag"
  );
}

function setup() {
  createCanvas(500, 500, WEBGL);
  noStroke();
}

function draw() {
  shader(theShader);
  //uniforms are uniform across all pixels, but can vary frame by frame
  theShader.setUniform("u_resolution", [width, height]);
  rect(0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
