let x;
let y;
let y_1;
let speedX;
let speedY;
let floatOffset = 0;
let jellyX;
let jellyY;
let bubbles = [];
function setup() {
  createCanvas(800, 500);
  for (let i = 0; i < 30; i++) {
    let bubble = {
      x: random(width),
      y: random(height),
      size: random(10, 20),
      speed: random(0.5, 3.5)
    };
    bubbles.push(bubble);
  }
  x = width / 2;
  y = 0;
  speedX = 2;
  speedY = 0.1;
}

function draw() {
  drawbackground();
  drawjellyfish();
  drawBubbles();
  
  function drawbackground(){
  for (let y_1 = 0; y_1 < height; y_1++) {
    let inter = map(y_1, 0, height, 0, 1);
    stroke(lerpColor(color(0, 60, 100), color(0, 20, 50), inter));
    line(0, y_1, width, y_1);
  }
}
  
  function drawBubbles() {
  fill(255, 150);
  noStroke();
  for (let bubble of bubbles) {
    ellipse(bubble.x, bubble.y, bubble.size);
    bubble.y = bubble.y - bubble.speed;
    if (bubble.y < -bubble.size) {
      bubble.x = random(width);
      bubble.y = height + random(50);
    }
  }
}
  
  function drawjellyfish(){
  r = map(sin(frameCount * 0.01), -1, 1, 100, 255);
  g = map(sin(frameCount * 0.015 + PI / 2), -1, 1, 100, 255);
  b = map(sin(frameCount * 0.02 + PI), -1, 1, 100, 255);
  noStroke();
  fill(r,g,b,150);
  floatOffset += 0.02;
  x = x + speedX;
  y = y + speedY;
 
  jellyY = height / 2;
  let jellyNewY = jellyY + sin(floatOffset) * 50;
  arc(x, jellyNewY+y, 200, 200, PI, 2 * PI);
  arc(x - 75, jellyNewY+y, 50, 50, 0, PI);
  arc(x - 25, jellyNewY+y, 50, 50, 0, PI);
  arc(x + 25, jellyNewY+y, 50, 50, 0, PI);
  arc(x + 75, jellyNewY+y, 50, 50, 0, PI);
  stroke(r,g,b,200);
  strokeWeight(5);
  noFill();
  curve(x + 70 + 20 * sin(frameCount * 0.01), y - 95, x - 50, y+jellyNewY+5, x - 150 + 20 * sin(frameCount * 0.02), y+jellyNewY+130, x + 135 + 200 * sin(frameCount * 0.03), y + 50);
  curve(x + 10 + 40 * sin(frameCount * 0.01), y + 30, x - 25, y+jellyNewY+25, x - 60 + 30 * sin(frameCount * 0.02), y+jellyNewY+150, x - 55 + 200 * sin(frameCount * 0.02), y + 600);
  curve(x + 5 * sin(frameCount * 0.01) + 50, y - 200, x, y+jellyNewY, x - 10 + 20 * sin(frameCount * 0.02), y+jellyNewY+150, x + 5 * sin(frameCount * 0.02) - 50, y);
  curve(x + 10 + 40 * sin(frameCount * 0.02), y + 30, x + 25, y+jellyNewY+25, x + 60 + 30 * sin(frameCount * 0.02), y+jellyNewY+150, x - 55 + 200 * sin(frameCount * 0.02), y + 600);
  curve(x + 70 + 20 * sin(frameCount * 0.01), y - 95, x + 50, y+jellyNewY+5, x + 150 + 20 * sin(frameCount * 0.02), y+jellyNewY+130, x - 225 + 20 * sin(frameCount * 0.02), y + 50);
  if(x < 150 || x > 640){
    speedX = -speedX;
  }
  if(y < -100 || y > 50){
    speedY = -speedY;
  }
  push();
  translate(x, y+jellyNewY);
  rotate(sin(frameCount * 0.03));
  noStroke();
  noFill();
  fill(r, g * 2, b * 3,100);
  ellipse(0, -80, 100, 35); 
  pop(); 
  
//Interaction 
  if(mouseIsPressed == true){
    x = lerp(x,mouseX - 100,0.03);
    y = lerp(y,mouseY - jellyNewY,0.03);

    noStroke();
    fill('rgb(209,127,127)');
    circle(mouseX,mouseY,10);
    noFill();
    stroke(0);
    arc(x - 50, y+jellyNewY-40, 40, 20, PI, 2 * PI);
    arc(x + 50, y+jellyNewY-40, 40, 20, PI, 2 * PI);
    if(x < 150) {
    x = 150;
  }
    else if(x > 640){
    x = 640;
  }
    if(y < -100){
    y = -100;
  }
    else if(y > 50){
    y = 50;
  }
}
  else if(keyIsPressed){
    noFill();
    stroke(0);
    line(x-30,y+jellyNewY-60,x-60,y+jellyNewY-30);
    line(x-60,y+jellyNewY-60,x-30,y+jellyNewY-30);
    line(x+30,y+jellyNewY-60,x+60,y+jellyNewY-30);
    line(x+60,y+jellyNewY-60,x+30,y+jellyNewY-30);
    speedX = 0;
    speedY = 0;
    x = x + random(-frameCount*0.01,frameCount*0.01);
  }
  else{
    noStroke();
    fill(0)
    ellipse(x - 50, y+jellyNewY-50, 20, 30);
    ellipse(x + 50, y+jellyNewY-50, 20, 30);
    fill(255);
    ellipse(x - 50, y+jellyNewY-55, 5, 10);
    ellipse(x + 50, y+jellyNewY-55, 5, 10);
  }
}
}