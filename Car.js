class Car {
  constructor(locationVector, mutationRate, dnaLength) {
    this.loc = locationVector;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.angle = 0;
    this.topSpeed = 5;

    this.dna = new DNA(mutationRate, dnaLength);
    this.geneCounter = 0;
  }

  run() {
    this.applyForce(this.dna.genes[this.geneCounter % this.dna.genes.length]);
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
