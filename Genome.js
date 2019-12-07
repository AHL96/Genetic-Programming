class Genome {
    constructor() {
        this.mass;
        this.mutationRate = 0.01;
        this.size = 500
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
        let vect = p5.Vector.random2D()
        let x = vect.x / 500
        let y = vect.y / 500
        return Vector.create(x, y);
    }

}