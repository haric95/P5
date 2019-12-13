var inp = 0;
var num_x, num_y;

let attackLevel = 1.0;
let releaseLevel = 0;
let attackTime = 0.2;
let decayTime = 0.2;
let susPercent = 0;
let releaseTime = 0.9;
let env, triOsc;

let indices = [0,1,2,3,4,5,6,7];
indices = fy_shuffle(indices)
let selected;

let frequencies = [440.00, 493.88, 554.37, 587.33, 659.25, 739.99, 830.61, 880.00];
let key_mapping = {0: 0,18: 1,3: 2,5: 3,6: 4,7: 5,9: 6,10: 7};
let major_arp = [0,2,4,7];
let frequency;
let sorted = false;
let just_sorted = false;
let just_sorted_count = 0;

let swapping = false;
swap_counter = 0
let swap_offset = 0;

let have_swapped  = false;
let on = 0;


function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    ellipseMode(RADIUS);
    frameRate(60);
    blendMode(HARD_LIGHT);
    colorMode(HSB, 100);
    env = new p5.Envelope();
    env.setADSR(attackTime, decayTime, susPercent, releaseTime);
    env.setRange(attackLevel, releaseLevel);
    triOsc = new p5.Oscillator('sine');
    triOsc.amp(env);
    triOsc.start();
    triOsc;
    delay = new p5.Delay();
    delay.process(triOsc, .4, .4, 800);
    let myDiv = createDiv('Press a Key to Start the Audio!');
    myDiv.style("font-size", "60px")
    myDiv.position(windowWidth/2 -400, windowHeight / 5);
    userStartAudio().then(function() {
        myDiv.remove();
    })
}

function draw() {
    background(100);
    x_border = 150;
    max_diameter = Math.floor((windowWidth - x_border) / 8);
    max_radius = max_diameter / 2;
    for (i = 0; i < 8; i++) {
        index = indices[i]
        noStroke();
        fill(30, 30, 10+5*index);
        let pos_x = x_border / 2 + max_radius + i*max_diameter;
        let pos_y = windowHeight / 2 + 15*sin(inp + index/2);
        smooth();
        ellipse(pos_x, pos_y, max_radius - 30, max_radius - 30);
        noFill();
        stroke(30);
        strokeWeight(3)
        if (selected == i) {
            strokeWeight(5);
            stroke(10)
        }
        offset = max_radius / 2;
        ellipse(pos_x + 10, pos_y - 10, max_radius - 30, max_radius - 30);
    }
    inp += PI/120;
    if (! sorted) {
        strokeWeight(5);
        stroke(30,20,10);
        rect_x = x_border/2 + max_diameter*on + 5;
        rect_y = windowHeight / 2 - max_radius - 10;
        rect(rect_x, rect_y, max_diameter * 2, max_diameter + 10, max_radius/2);
    }
    if (just_sorted) {
        if (just_sorted_count >= 20) {
            just_sorted = false;
        } else {
            if (just_sorted_count % 5 == 0) {
                selected = major_arp[just_sorted_count / 5];
                frequency = frequencies[selected];
                triOsc.freq(frequency);
                env.play()
            }
        }
        just_sorted_count ++;
    }
    if (swapping) {
        swap_offset = sin(PI/(100-swap_counter))
        swap_counter += 1
        if (swap_counter >= 100) {
            swapping = false;
            swap_counter = 0;
        }
    }
}

function fy_shuffle(arr) {
    let output = [];
    while (arr.length > 0) {
        index = Math.floor(Math.random()*arr.length);
        output.push(arr[index]);
        arr.splice(index, 1)
    }
    return output;
};

function bubble_sort_pass(indices) {
    if (! sorted ) {
        if (indices[on] > indices[on+1]) {
            const temp = indices[on];
            indices[on] = indices[on+1];
            indices[on+1] = temp;
            have_swapped = true;
            swapping = true;on 
        }
        on++;
        if (on >= indices.length - 1){
            on = 0
            if (! have_swapped) {
                console.log("I'm in tune now!");
                sorted = true;
                just_sorted = true;
            } else {
                have_swapped = false;
            }
        }
    }
}





function keyPressed() {
    let keyIndex = -1;
    if (key >= 'a' && key <= 'z') {
      keyIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
    } else if (key == " "){
        bubble_sort_pass(indices);
    }
    if (keyIndex in key_mapping) {
        selected = key_mapping[keyIndex];
        frequency = frequencies[indices[selected]];

        if (! sorted) {
            frequency += (Math.random()*30)
        }
        triOsc.freq(frequency);
        env.play();
    }
}

// class smiley {
//     constructor(smile,x, y, radius) {
//         this.smile = smile;
//         this.x = x;
//         this.y = y;
//         this.radius = radius;
//     }
//     display() {
//         ellipse(this.x, this.y, this.radius, this.radius)
//         if (smile) {
//             this.
//         }
//     } 

// }

function windowResized() {
    background(150);
    distance = 0;
    resizeCanvas(windowWidth, windowHeight);
}
