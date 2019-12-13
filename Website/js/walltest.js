function setup() {
  canvas = createCanvas(1920, 896);
  background(10);
}

function draw() {
  noStroke();
  fill(255, 0, 0);
  rect(0, 0, 620, 896);
  fill(255, 255, 0);
  rect(640, 0, 1280, 256);
  fill(0, 0, 0);
  rect(384, 256, 1536, 640);
  ellipse(640, 0, 1280, 265);
}

// vertical screen res =
