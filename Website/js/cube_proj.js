let j = 0;
time = 0;
let toggle = 0;
let randCounter = 10;
let counter = 0;
val = 0;

function setup() {
  // blendMode(MULTIPLY);
  createCanvas(600, 600);
  background(240);
  translate(300, 300);
  testcube = new cube(20);
  testcube.project(2);
  grain = createGraphics(600, 600);
  createGrain(grain);
  pg1 = createGraphics(600, 600);
  pg1.image(grain, 0, 0);
  pg2 = createGraphics(600, 600);
  pg2.image(grain, 0, 0);
  pg3 = createGraphics(600, 600);
  pg3.image(grain, 0, 0);
  pg4 = createGraphics(600, 600);
  pg4.image(grain, 0, 0);
  pg1.translate(300, 300);
  pg2.translate(300, 300);
  pg3.translate(300, 300);
  pg4.translate(300, 300);
}

function createGrain(grain) {
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      add = Math.floor(Math.random() * 10) - 5;
      stroke(100);
      strokeWeight(1);
      fill(0);
      grain.rect(i * 30, j * 30, 4, 4);
    }
  }
}

function draw() {
  val = Math.sin(time / 100);
  background(24);
  translate(300, 300);
  image(pg1, -300, -300, 150, 150);
  image(pg2, 150, -300, 150, 150);
  image(pg3, -300, 150, 150, 150);
  image(pg4, 150, 150, 150, 150);
  testcube.rotatez();
  testcube.rotatez();
  testcube.project(10);
  if (toggle === 0) {
    testcube.show();
    toggle = 1;
  } else {
    if (Math.random() < 0.9) {
      testcube.show();
    }
    toggle = 0;
  }
  time += 1;

  if (time % 20 === 0) {
    td20 = time / 20;

    switch (td20 % 4) {
      case 0:
        testcube.drawToBuffer(pg1);
        if (Math.random() > 0.3) {
          pg3.background(24);
          pg3.image(grain, -300, -300, 600, 600);
        }
        break;
      case 1:
        testcube.drawToBuffer(pg2);
        if (Math.random() > 0.5) {
          pg4.background(24);
          pg4.image(grain, -300, -300, 600, 600);
        }
        break;
      case 3:
        testcube.drawToBuffer(pg3);
        if (Math.random() > 0.25) {
          pg1.background(24);
          pg1.image(grain, -300, -300, 600, 600);
        }
        break;
      case 2:
        testcube.drawToBuffer(pg4);
        if (Math.random() > 0.1) {
          pg2.background(24);
          pg2.image(grain, -300, -300, 600, 600);
        }
        break;
    }
  }

  if (counter > 0) {
    filter(INVERT);
  } else {
    if (Math.random() < 0.01) {
      counter = 10;
    }
  }
  counter--;
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
      stroke(val + j * 3, 50 + time / 3, 200 + j);
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

  drawToBuffer(buffer) {
    buffer.strokeWeight(4);
    buffer.strokeCap(ROUND);
    let j = 10;
    for (let edge of this.adj) {
      buffer.stroke(val + j * 4, 180, 180 + j);
      let x1 = this.twodvertices[edge[0]][0];
      let y1 = this.twodvertices[edge[0]][1];
      let x2 = this.twodvertices[edge[1]][0];
      let y2 = this.twodvertices[edge[1]][1];
      buffer.line(x1, y1, x2, y2);
      j += 5;
    }
    buffer.fill(24);
    buffer.beginShape(TRIANGLES);
    buffer.vertex(this.twodvertices[0][0], this.twodvertices[0][1]);
    buffer.vertex(this.twodvertices[1][0], this.twodvertices[1][1]);
    buffer.vertex(this.twodvertices[2][0], this.twodvertices[2][1]);
    buffer.endShape();
    buffer.beginShape(TRIANGLES);
    buffer.vertex(this.twodvertices[3][0], this.twodvertices[3][1]);
    buffer.vertex(this.twodvertices[4][0], this.twodvertices[4][1]);
    buffer.vertex(this.twodvertices[7][0], this.twodvertices[7][1]);
    buffer.endShape();
  }

  rotatez() {
    let tempvertices = [];
    for (let vertex of this.vertices) {
      let temp = [];
      temp.push(vertex[0] * cos(0.012) - vertex[2] * sin(0.011));
      temp.push(vertex[0] * sin(0.007) + vertex[2] * cos(0.015));
      temp.push(vertex[1]);
      tempvertices.push(temp);
    }
    this.vertices = tempvertices;
  }
}

const btn = document.getElementById("record");
console.log(btn);
const chunks = [];

function record() {
  chunks.length = 0;
  let stream = document.querySelector("canvas").captureStream(30),
    recorder = new MediaRecorder(stream);
  recorder.ondataavailable = e => {
    if (e.data.size) {
      chunks.push(e.data);
    }
  };
  recorder.onstop = exportVideo;
  btn.onclick = e => {
    recorder.stop();
    btn.textContent = "start recording";
    btn.onclick = record;
  };
  recorder.start();
  btn.textContent = "stop recording";
}

function exportVideo(e) {
  var blob = new Blob(chunks);
  var vid = document.createElement("video");
  vid.id = "recorded";
  vid.controls = true;
  vid.src = URL.createObjectURL(blob);
  document.body.appendChild(vid);
  vid.play();
}
btn.onclick = record;
