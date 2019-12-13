const width = 256;
const height = 1280;
let img;

function setup() {
  canvas = createCanvas(width, height, WEBGL);
  background(0);
  planets = [];
  for (i = 0; i < 100; i++) {
    new_planet = new planet();
    planets.push(new_planet);
  }
}

function draw() {
  background(0);
  rotateY(frameCount / 100);
  for (i = 0; i < planets.length; i++) {
    a_planet = planets[i];
    translate(a_planet.x, a_planet.y, a_planet.z);
    a_planet.show();
  }
}

// class raindrop {
//   constructor() {
//     this.x = random(width);
//     this.y = random(-1000, 0);
//     this.speed = 0;
//     this.size = random(5, 20);
//     this.acceleration = random(0.5, 2);
//   }
//   fall() {
//     this.y += this.speed;
//     this.speed += this.acceleration;
//     if (this.y >= 1280) {
//       this.y = 0;
//       this.speed = 0;
//       this.size = random(5, 20);
//       this.x = random(width);
//     }
//   }
//   display()
//     stroke(200);
//     line(this.x, this.y, this.x, this.y - 20);
//   }
// }

class planet {
  constructor() {
    this.rand_unit = p5.Vector.random3D();
    this.x = (this.rand_unit["x"] * width) / 2;
    this.y = (this.rand_unit["y"] * height) / 2;
    this.z = this.rand_unit["z"] * 200;
  }
  show() {
    box();
  }
}

class hole {
  show() {
    box();
  }
}
