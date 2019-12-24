class Genome {
    constructor() {
        this.mass;
        this.mutationRate = 0.015;
        this.size = GENERATION_LENGTH
        this.sequence = []
        for (let i = 0; i < this.size; i++) {
            this.sequence.push(this.randomGene());
        }
    }

    crossover(otherGenome) {
        const newGenome = new Genome();
        for (let i = 0; i < newGenome.sequence.length; i++) {
            if (Math.random() < 0.5) {
                newGenome.sequence[i] = this.sequence[i];
            } else {
                newGenome.sequence[i] = otherGenome.sequence[i]
            }
        }
        return newGenome;
    }

    mutate() {
        for (var i = 0; i < this.sequence.length; i++) {
            if (Math.random() < this.mutationRate) {
                this.sequence[i] = this.randomGene();
            }
        }
    }

    randomGene() {
        let angle = Math.random() * (2 * Math.PI)
        let x = Math.cos(angle) / 100
        let y = Math.sin(angle) / 100
        return Vector.create(x, y);
    }

}