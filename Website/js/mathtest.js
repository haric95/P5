class square {
  constructor(center, size) {
    let value = size / 2;
    this.vertices = [];
    this.center = center;
    this.vertices[0] = [this.center - value, this.center - value, 1];
    this.vertices[1] = [this.center + value, this.center - value, 1];
    this.vertices[2] = [this.center + value, this.center + value, 1];
    this.vertices[3] = [this.center - value, this.center + value, 1];
  }

  rotate(theta) {
    let first_trans_matrix = math.matrix([
      [1, 0, -this.center],
      [0, 1, -this.center],
      [0, 0, 1]
    ]);

    let rot_matrix = math.matrix([
      [Math.cos(theta), -Math.sin(theta), 0],
      [Math.sin(theta), Math.cos(theta), 0],
      [0, 0, 1]
    ]);

    let second_trans_matrix = math.matrix([
      [1, 0, this.center],
      [0, 1, this.center],
      [0, 0, 1]
    ]);

    for (let i = 0; i < this.vertices.length; i++) {
      let temp = math.multiply(
        second_trans_matrix,
        rot_matrix,
        first_trans_matrix,
        this.vertices[i]
      );
      this.vertices[i] = temp.toArray();
    }
  }

  show() {
    let adjacency = [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0]
    ];
    beginShape();
    for (let corner of this.vertices) {
      vertex(corner[0], corner[1]);
    }
    endShape(CLOSE);
  }
}

function setup() {
  createCanvas(600, 600);
  background(220);
  boxy = new square(300, 60);
  boxy.show();
}

function draw() {
  background(220);
  boxy.rotate(0.01);
  boxy.show();
}
