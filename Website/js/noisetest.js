function setup() {
  createCanvas(600, 600);
  textSize(22);
}
function draw() {
  background(240);
  translate(width / 2, height / 2);
  let noiseVal = map(noise(mouseX / 10), 0, 1, 0, 200);
  text(noiseVal, 40, 10);
  line(noiseVal, 0, noiseVal, height);
  translate(0, 100);
  text(mouseX, 40, 10);
  translate(0, -height / 2);
}
