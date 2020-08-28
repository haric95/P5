let j = 0;
let time = 0;

let ortho_matrix = math.matrix([[1, 0, 0, 0], [0, 1, 0, 0]]);

class stereo_matrix {
  constructor(k) {
    this.values = math.matrix([[k, 0, 0, 0], [0, k, 0, 0]]);
  }
}

let xy_rotation_matrix = math.matrix([
  [Math.cos(0.02), -Math.sin(0.02), 0, 0],
  [Math.sin(0.02), Math.cos(0.02), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]
]);

let xz_rotation_matrix = math.matrix([
  [Math.cos(0.02), 0, -Math.sin(0.02), 0], [0, 1, 0, 0],
  [Math.sin(0.02), 0, Math.cos(0.02), 0], [0, 0, 0, 1]
]);

function setup() {
  createCanvas(600, 600);
  background(24);
  translate(width / 2, height / 2);
  testcube = new cube(10);
  testcube.xz_rotate();
  testcube.stereo_project(2);
}

function draw() {
  background(24);
  translate(width / 2, height / 2);
  testcube.show(10);
  testcube.xz_rotate();
  testcube.stereo_project(2);
}

class cube {
  constructor(size) {
    this.size = size;
    this.vertices = [];
    this.twodvertices = [];
    this.adj = [
      [0, 2], [1, 3], [0, 1], [3, 2], [4, 6], [5, 7], [4, 5], [7, 6], [0, 5],
      [1, 7], [2, 4], [3, 6], [1, 4], [1, 3]
    ];
    this.unitvertices = [
      [-1.0, -1.0, -1.0, 1], [1.0, -1.0, -1.0, 1], [-1.0, 1.0, -1.0, 1],
      [-1.0, -1.0, 1.0, 1], [1.0, 1.0, -1.0, 1], [1.0, -1.0, 1.0, 1],
      [-1.0, 1.0, 1.0, 1], [1.0, 1.0, 1.0, 1]
    ];

    for (let corner of this.unitvertices) {
      this.vertices.push(corner.map(x => x * this.size));
    }
  }

  ortho_project() {
    this.twodvertices = [];
    for (let corner of this.vertices) {
      let projected = math.multiply(ortho_matrix, corner);
      this.twodvertices.push(projected.toArray());
    }
  }

  stereo_project(K) {
    this.twodvertices = [];
    for (let corner of this.vertices) {
      let k = 1 / (K - corner[2] / this.size);
      let stereo_matrix = math.matrix([[k, 0, 0, 0], [0, k, 0, 0]]);
      let projected = math.multiply(stereo_matrix, corner);
      this.twodvertices.push(projected.toArray());
    }
  }

  show(size) {
    strokeWeight(4);
    strokeCap(ROUND);
    let j = 10;
    for (let edge of this.adj) {
      stroke(0 + j * 0.7 * 5, 200, 200 + j);
      let x1 = this.twodvertices[edge[0]][0] * size;
      let y1 = this.twodvertices[edge[0]][1] * size;
      let x2 = this.twodvertices[edge[1]][0] * size;
      let y2 = this.twodvertices[edge[1]][1] * size;
      line(x1, y1, x2, y2);
      j += 5;
    }

    fill(24);
    beginShape(TRIANGLES);
    vertex(this.twodvertices[0][0] * size, this.twodvertices[0][1] * size);
    vertex(this.twodvertices[1][0] * size, this.twodvertices[1][1] * size);
    vertex(this.twodvertices[2][0] * size, this.twodvertices[2][1] * size);
    endShape();
    beginShape(TRIANGLES);
    vertex(this.twodvertices[3][0] * size, this.twodvertices[3][1] * size);
    vertex(this.twodvertices[4][0] * size, this.twodvertices[4][1] * size);
    vertex(this.twodvertices[7][0] * size, this.twodvertices[7][1] * size);
    endShape();
  }

  xy_rotate() {
    for (let i = 0; i < this.vertices.length; i++) {
      let temp = math.multiply(xy_rotation_matrix, this.vertices[i]).toArray();
      this.vertices[i] = temp;
    }
  }
  xz_rotate() {
    for (let i = 0; i < this.vertices.length; i++) {
      let temp = math.multiply(xz_rotation_matrix, this.vertices[i]).toArray();
      this.vertices[i] = temp;
    }
  }
}
