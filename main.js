let car;
let friction;

function setup() {
  let w = document.body.offsetWidth;
  let h = document.body.offsetHeight;
  createCanvas(w, h);
  car = new Car(createVector(width / 2, height / 2));
}

function draw() {
  background(200);

  friction = createVector(car.vel.x, car.vel.y);
  friction.mult(-1);
  friction.normalize();
  friction.mult(0.01);

  car.applyForce(friction);

  car.run();
}
