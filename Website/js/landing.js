var inp = 0
var rand_i;
var rand_j;
var num_x;
var num_y;


let attackLevel = 1.0;
let releaseLevel = 0;
let attackTime = 0.001;
let decayTime = 0.2;
let susPercent = 0.2;
let releaseTime = 0.5;
let env, triOsc;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    // canvas.style("z-index", "-1")
    ellipseMode(RADIUS);
    frameRate(60);
    blendMode(HARD_LIGHT);
    env = new p5.Envelope();
    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
    env.setRange(attackLevel, releaseLevel);
    triOsc = new p5.Oscillator('sine');
    triOsc.amp(env);
    triOsc.start();
    triOsc;
    delay = new p5.Delay();
    delay.process(triOsc, .25, .4, 500);


    
}

function windowResized() {
    background(150);
    distance = 0;
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    // freq = i*10 + j
    triOsc.freq(110 + 55*(rand_i%2) + 55*(rand_j%2) + i*j*5);
    rand_i = Math.floor(Math.random() * (num_x + 1));
    rand_j = Math.floor(Math.random() * (num_y + 1));
    env.play();

}

function draw() {
    background(155);
    x_border = 50;
    y_border = 50;
    radius = 80;
    diameter = radius*2;
    num_x = Math.floor((windowWidth - x_border) / (diameter));
    num_y = Math.floor((windowHeight - y_border) / (diameter));
    x_offset = x_border/2 + ((windowWidth - x_border) % diameter) / 2;
    y_offset = y_border/2 + ((windowHeight - y_border) % diameter) / 2;
    noStroke();
    for (i = 0; i < num_x; i++) {
        for (j = 0; j < num_y; j++) {
            fill(170 - i*10,120 - j*3,180);
            
            x_coord = (x_offset) + radius + i*radius*2
            y_coord =  (y_offset) + radius + j*radius*2
            var distance = dist(mouseX, mouseY, x_coord, y_coord);
            if (i == rand_i && j == rand_j) {
                fill(100,140,100);
                distance = 100;
                attackLevel = Math.floor(i/10);
            }
            var size_change = 20*(sin(-inp + distance/100));
            ellipse(x_coord, y_coord, radius-distance/15 + size_change, radius-distance/15 + size_change);
            noFill();
            stroke(30);
            ellipse(x_coord+5, y_coord-8, radius-distance/15 + size_change, radius-distance/15 + size_change);

        }
    }
    inp += PI / 60;
}