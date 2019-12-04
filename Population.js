class Population {
    constructor(world) {
        this.creatures = [];
        for (let i = 0; i < 50; i++) {
            this.creatures.push(new Creature(world))
        }
        this.size = this.creatures.length;
        this.matingPool = [];
        this.cycle = 0;
        this.generation = 0;
    }

    calcFitness() {
        for (let c of this.creatures) {
            c.calcFitness(target);
        }
    }

    selection() {
        this.matingPool = [];
        for (let i = 0; i < this.creatures.length; i++) {
            let creature = this.creatures[i];
            let fitnessNormal = map(creature.fitness, 0, this.getMaxFitness(), 0, 1);
            let n = Math.floor(fitnessNormal * 100);
            for (let j = 0; j < n; j++) {
                this.matingPool.push(creature);
            }
        }

    }

    run() {
        if (this.cycle < GENOME_LENGTH) {
            for (let c of this.creatures) {
                c.run();
            }
            this.cycle++;
        } else {
            this.calcFitness()
            this.selection();
            this.reproduction();
            this.cycle = 0;
            this.generation++;
        }
    }

    reproduction() {
        for (var i = 0; i < this.size; i++) {
            let a = Math.floor(random(0, this.matingPool.length));
            let b = Math.floor(random(0, this.matingPool.length));

            let parentA = this.matingPool[a].genome;
            let parentB = this.matingPool[b].genome;

            let child = new Creature();
            child.genome = parentA.crossover(parentB);
            child.genome.mutate();
            this.creatures[i] = child;
        }
        World.clear(world, true);
        World.add(world, this.creatures);
    }

    getMaxFitness() {
        let max = -1;
        for (var i = 0; i < this.creatures.length; i++) {
            if (max < this.creatures[i].fitness) max = this.creatures[i].fitness;
        }
        return max;
    }


}