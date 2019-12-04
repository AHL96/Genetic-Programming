class Creature extends Matter.Bodies.rectangle {
    constructor(world) {
        super(
            window.innerWidth * .1, window.innerHeight * .1,
            10, 10,
            {
                isSensor: true,
                mass: 1
            }
        )

        this.genome = new Genome();

        this.geneCounter = 0;
        this.alive = true;
        this.fitness = 0;

        if (world) {
            World.add(world, this);
        }

    }

    calcFitness = (target) => {
        let d = Vector.sub(target.position, this.position);
        d = Vector.magnitude(d);
        this.fitness = 1 / d;
        this.fitness = Math.pow(this.fitness, 4);
    }

    run = () => {
        var temp = this.genome.sequence[this.geneCounter];
        Object.assign(this.force, temp);
        this.geneCounter++;
    }

}
