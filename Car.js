class Car {
  constructor(locationVector, dna) {
    this.loc = locationVector;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.angle = 0;

    this.topSpeed = 5;

    this.dna = dna;
    this.geneCounter = 0;

    this.fitness = 0;
  }

  calcFitness(target) {
    let d = p5.Vector.sub(target.loc, this.loc);
    d = d.mag();
    this.fitness = 1 / d;
    this.fitness = pow(this.fitness, 4);
    return this.fitness;
  }

  run() {
    this.applyForce(this.dna.genes[this.geneCounter % this.dna.genes.length]);

    let friction = createVector(this.vel.x, this.vel.y);
    friction.mult(-1);
    friction.normalize();
    friction.mult(0.01);
    this.applyForce(friction);

    this.update();
    this.display();
    this.geneCounter++;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.topSpeed);
    this.loc.add(this.vel);
    this.acc.mult(0);

    this.angle = this.vel.heading();
  }

  applyForce(vector) {
    this.acc.add(vector);
  }

  display() {
    push();
    rectMode(CENTER);
    translate(this.loc.x, this.loc.y);
    rotate(this.angle);
    rect(0, 0, 20, 10);
    pop();
  }
}
