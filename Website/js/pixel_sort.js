let img;
function preload() {
  img = loadImage("http://127.0.0.1:8887/js/imgs/comps.jpg");
}

function setup() {
  img.resize(500, 0);
  new_img = createImage(img.width, img.height);
  createCanvas(img.width, img.height);
  image(img, 0, 0, width, height);
  loadPixels();
  sorted_row = [];
  for (i = 0; i < img.width; i += 4) {
    sorted_row.push;
  }

  updatePixels();
}
