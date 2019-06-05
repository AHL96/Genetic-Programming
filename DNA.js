class DNA {
  constructor(mutationRate, dnaLength) {
    this.genes = [];
    for (var i = 0; i < dnaLength; i++) {
      this.genes.push(Vector.random2D());
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
