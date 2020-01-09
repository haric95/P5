let printedCurves = [];

class perlinLine {
  constructor(length) {
    this.startValues = [];
    this.values = [];
    this.noiseOffset = 0;
    for (let i = -length; i < length; i++) {
      let point = [0, 0 + i];
      this.values.push(point);
      this.startValues.push(point);
    }
  }

  show() {
    stroke(0, 100, 100);
    strokeWeight(5);
    noFill();
    beginShape();
    for (point of this.values) {
      curveVertex(point[0], point[1]);
    }
    endShape();
  }

  addNoise(scale1, scale2) {
    let tempPoints = [];
    for (let i = 0; i < this.values.length; i++) {
      // let x = point[0] + noise(point[0]) * 5;
      let x =
        this.startValues[i][0] +
        (noise(this.values[i][1] * scale1 + this.noiseOffset) - 0.5) * scale2;
      let y = this.values[i][1];
      tempPoints.push([x, y]);
    }
    this.values = tempPoints;
    this.noiseOffset += 0.01;
  }
}

function setup() {
  createCanvas(600, 600);
  background(50);
  noiseSeed(Math.floor(random(1000)));
  translate(width / 2, height / 2);
  aLine = new perlinLine(100);
  aLine.show();
}

function draw() {
  background(50);
  translate(width / 2, height / 2);
  aLine.addNoise(0.01, 400);
  aLine.show();
}
