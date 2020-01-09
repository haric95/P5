function setup() {
  createCanvas(400, 600);
  background(250);
  textFont("Helvetica");
  textSize(180);
  pg = createGraphics(250, 380);
  pg.textSize(400);
  pg.textFont("monospace");
  pg.background(51);
  pg.text("p", 0, 270);
}

function draw() {
  text("hollatest", 0, 80);
  image(pg, 0, 0);
}
