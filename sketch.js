
let vs = []
let emoticon;
function setup() {
  createCanvas(600, 600);
  emot = loadImage('emoticon.png')
  for(var i = 0; i<10; i++){
    xPos = random(400)
    yPos = random(400)
    vs[i] = new Vehicle(xPos,yPos);
  }
  
}

function draw() {
  background(220);
  
  textSize(20);
  fill(0, 102, 153);
  text('Kelompok 3 Visualisasi dalam Sains', 10, 30);
  fill(0, 102, 153);
  text('Simulasi Buzzer Bot', 10, 50);
  fill(0, 102, 153);
  text('Koordinator Yahya Agung Nadabunda', 10, 70);
  
  mouse = createVector(mouseX, mouseY);
  ellipse(mouse.x+10, mouse.y+10, 20, 20)
  for(var i = 0; i<10; i++){
  vs[i].display()
  vs[i].arrive(mouse);
  vs[i].update();
  }
}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(random(-10,10),random(-10,10));
    this.acceleration = createVector(0,0);
    this.l = 30.0;
    //kecepatan 4 pixel/s
    this.maxspeed = 4;
    //kemampuan berbelok
    this.maxforce = 0.1;
  }
  
  seek(vektorTarget){
    // percieve target location
    
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
  
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  arrive(vektorTarget){
     
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()
    
    if(jarak < 100){
      var m = map(jarak, 0 ,100,0, 0);
      desired.normalize();
      desired.mult(m);
 
    }
    else{
    desired.normalize();
    desired.mult(this.maxspeed/5);
    }
     //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
    
    
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    fill(175);
    stroke(0);
    translate(this.location.x, this.location.y)
    rotate(theta)
    //avatar
    image(emot, 2*this.l/2, 2, 4*-this.l/2, 2*this.l)
    pop();
  }
}

class FlowField{
  constructor(r){
    this.resolution = r;
     
    
  }

  lookup(location){
     
  }


  display(){
    for (var i=0; i<this.cols;i++){
      for (var j=0; j<this.rows;j++){
        this.drawArrow(this.flow[i][j], 
                       i*this.resolution, 
                       j*this.resolution,
                       this.resolution-2)
      }
    }
  }

  drawArrow(v, x, y, scayl) {
    push();
    var arrowsize = 4;
    // Translate to position to render vector
    translate(x,y);
    stroke(0,100);
    // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
    rotate(v.heading());
    // Calculate length of vector & scale it to be bigger or smaller if necessary
    var len = v.mag()*scayl;
    // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
    line(0,0,len,0);
    //line(len,0,len-arrowsize,+arrowsize/2);
    //line(len,0,len-arrowsize,-arrowsize/2);
    pop();
  }
}
