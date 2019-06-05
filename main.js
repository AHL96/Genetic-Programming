let car;
let friction;

function setup() {
  createCanvas(600, 400);
  car = new Car(createVector(width / 2, height / 2));

  car.applyForce(createVector(-2, 1));
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
