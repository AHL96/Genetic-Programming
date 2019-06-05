let population;
let target;

function setup() {
  let w = document.body.offsetWidth;
  let h = document.body.offsetHeight;
  createCanvas(w, h);

  population = new Population();
  target = new Obstacle(createVector(width / 2, 10), 10, 10);
}

function draw() {
  background(200);

  population.run();
  target.display();
}
