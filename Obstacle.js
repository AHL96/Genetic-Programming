class Obstacle {
  constructor(locationVector, w, h) {
    this.loc = locationVector;
    this.w = w;
    this.h = h;
  }

  update() { }

  display() {
    rect(this.loc.x, this.loc.y, this.w, this.h);
  }
}
