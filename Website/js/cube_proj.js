let j = 0;
time = 0;

function setup() {
  createCanvas(600, 600);
  background(240);
  translate(300, 300);
  testcube = new cube(20);
  testcube.project(2);
}

function draw() {
  translate(300, 300);
  background(24);
  testcube.rotatez();
  testcube.rotatez();
  testcube.project(10);
  testcube.show();
  time += 1;
}

class cube {
  constructor(size) {
    this.size = size;
    this.vertices = [];
    this.twodvertices = [];
    this.adj = [
      [0, 2],
      [1, 3],
      [0, 1],
      [3, 2],
      [4, 6],
      [5, 7],
      [4, 5],
      [7, 6],
      [0, 5],
      [1, 7],
      [2, 4],
      [3, 6],
      [1, 4],
      [1, 3]
    ];
    this.unitvertices = [
      [-0.5, -0.5, -0.5],
      [0.5, -0.5, -0.5],
      [-0.5, 0.5, -0.5],
      [-0.5, -0.5, 0.5],
      [0.5, 0.5, -0.5],
      [0.5, -0.5, 0.5],
      [-0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5]
    ];
    for (let vertex of this.unitvertices) {
      this.vertices.push(vertex.map(x => x * this.size));
    }
  }

  project(K) {
    this.twodvertices = [];
    for (let vertex of this.vertices) {
      let k = K - vertex[2];
      let x = vertex[0] * k;
      let y = vertex[1] * k;
      this.twodvertices.push([x, y]);
    }
  }

  show() {
    strokeWeight(4);
    strokeCap(ROUND);
    let j = 10;
    for (let edge of this.adj) {
      stroke(0 + j * 5, 200, 200 + j);
      let x1 = this.twodvertices[edge[0]][0];
      let y1 = this.twodvertices[edge[0]][1];
      let x2 = this.twodvertices[edge[1]][0];
      let y2 = this.twodvertices[edge[1]][1];
      line(x1, y1, x2, y2);
      j += 5;
    }
    fill(24);
    beginShape(TRIANGLES);
    vertex(this.twodvertices[0][0], this.twodvertices[0][1]);
    vertex(this.twodvertices[1][0], this.twodvertices[1][1]);
    vertex(this.twodvertices[2][0], this.twodvertices[2][1]);
    endShape();
    beginShape(TRIANGLES);
    vertex(this.twodvertices[3][0], this.twodvertices[3][1]);
    vertex(this.twodvertices[4][0], this.twodvertices[4][1]);
    vertex(this.twodvertices[7][0], this.twodvertices[7][1]);
    endShape();
  }

  rotatez() {
    let tempvertices = [];
    for (let vertex of this.vertices) {
      let temp = [];
      temp.push(vertex[0] * cos(0.01) - vertex[2] * sin(0.01));
      temp.push(vertex[0] * sin(0.0066) + vertex[2] * cos(0.015));
      temp.push(vertex[1]);
      tempvertices.push(temp);
    }
    this.vertices = tempvertices;
  }
}
