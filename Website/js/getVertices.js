let vertexList = [];

function preload() {
  img = loadImage("http://127.0.0.1:8887/imgs/phntm.png");
}

function setup() {
  createCanvas(1024, 626);
  img.resize(1024, 626);
  image(img, 0, 0);
}

function mouseClicked() {
  vertexList.push([mouseX - 503, mouseY - 290]);
  console.log(mouseX - 503, mouseY - 290);
  ellipse(mouseX, mouseY, 2, 2);
}
