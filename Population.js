class Population {
  constructor(size = 100) {
    this.population = [];
    this.dnaLength = 500;
    this.size = size;
    for (var i = 0; i < size; i++) {
      this.population.push(
        new Car(createVector(25, height / 2), new DNA())
      );
    }

    this.cycle = 0;
  }

  calcFitness() {
    for (let car of this.population) {
      car.calcFitness(target);
    }
  }

  selection() {
    this.matingPool = [];
    for (let i = 0; i < this.population.length; i++) {
      let car = this.population[i];
      let fitnessNormal = map(car.fitness, 0, this.getMaxFitness(), 0, 1);
      let n = Math.floor(fitnessNormal * 100);
      for (let j = 0; j < n; j++) {
        this.matingPool.push(car);
      }
    }
  }

  run() {
    if (this.cycle < this.dnaLength) {
      for (let car of this.population) {
        car.run();
      }
      this.cycle++;
    } else {
      this.calcFitness();
      this.selection();
      this.reproduction();
      this.cycle = 0;
    }
  }

  reproduction() {
    for (var i = 0; i < this.size; i++) {
      let a = Math.floor(random(0, this.matingPool.length));
      let b = Math.floor(random(0, this.matingPool.length));

      let parentA = this.matingPool[a].dna;
      let parentB = this.matingPool[b].dna;

      let newDNA = parentA.crossover(parentB);
      newDNA.mutate();
      let childCar = new Car(createVector(25, height / 2), newDNA);
      this.population[i] = childCar;
    }
  }

  getMaxFitness() {
    let max = -1;
    for (var i = 0; i < this.population.length; i++) {
      if (max < this.population[i].fitness) max = this.population[i].fitness;
    }
    return max;
  }
}
