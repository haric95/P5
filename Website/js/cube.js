const width = 256;
const height = 1280;
let angle = 0;
let img;

function setup() {
  canvas = createCanvas(width, height, WEBGL);
  background(0);
  box_1 = new cube();
}

function draw() {
  background(0);
  translate(box_1.x, box_1.y, box_1.z);
  rotateY(angle);
  rotateZ(angle);
  box_1.show();
  angle += 0.0025;
}

class cube {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }
  show() {
    box();
  }
}
