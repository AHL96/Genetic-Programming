class DNA {
  constructor(mutationRate = 0.01, dnaLength = 100) {
    this.genes = [];
    for (var i = 0; i < dnaLength; i++) {
      this.genes.push(p5.Vector.random2D());
    }
    this.mutationRate = mutationRate;
  }

  crossover(DNA1, DNA2) {
    let newDNA = new DNA();
    for (var i = 0; i < newDNA.length; i++) {
      newDNA[i];
    }
  }

  mutate() {}
}
