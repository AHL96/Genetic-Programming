class DNA {
  constructor(dnaLength = 1000) {
    this.genes = [];
    for (var i = 0; i < dnaLength; i++) {
      this.genes.push(p5.Vector.random2D());
    }
  }

  crossover(otherDNA) {
    let newDNA = new DNA(this.genes.length);
    for (var i = 0; i < this.genes.length; i++) {
      let n = random(1);
      if (n > 0.5) {
        newDNA.genes[i] = this.genes[i];
      } else {
        newDNA.genes[i] = otherDNA.genes[i];
      }
    }
    return newDNA;
  }

  mutate(mutationRate = 0.01) {
    for (var i = 0; i < this.genes.length; i++) {
      let n = random(1);
      if (n < mutationRate) {
        this.genes[i] = p5.Vector.random2D();
      }
    }
  }
}
