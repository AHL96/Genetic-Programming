let population;
let target;

function setup() {
  rectMode(CENTER)
  let w = document.body.offsetWidth;
  let h = document.body.offsetHeight;
  createCanvas(w, h);

  population = new Population();
  target = new Obstacle(createVector(width - 50, height / 2), 10, 10);
}

function draw() {
  background(200);

  population.run();
  target.display();
}
