

void setup(){
  size(1920,896, P3D);
  background(0,0,0);
}

void draw(){
  noStroke();
  fill(255,0,0);
  rect(0,0,620,896);
  fill(255,255,0);
  rect(640,0,1280,256);
  fill(0,0,0);
  rect(384,256,1536,640);
}
