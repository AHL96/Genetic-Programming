class Creature extends Matter.Bodies.rectangle {
    constructor(world) {
        super(
            window.innerWidth * .1, window.innerHeight * .1,
            10, 10, {
            isSensor: false,
            mass: 1,
            collisionFilter: {
                group: -1
            }
        }
        );

        this.genome = new Genome();

        this.geneCounter = 0;
        this.alive = true;
        this.fitness = 0;

        this.recordDist = Infinity;
        this.finishTime = 0;
        this.hitTarget = false;

        if (world) {
            World.add(world, this);
        }

    }

    calcFitness = (target) => {
        let d = Vector.sub(target.position, this.position);
        d = Vector.magnitude(d)

        if (this.recordDist < 1) this.recordDist = 1;

        this.fitness = (1 / (this.finishTime * d));
        // this.fitness = (1 / (this.finishTime * this.recordDist * d));
        this.fitness = Math.pow(this.fitness, 4);
    }

    run = () => {
        let d = Vector.sub(target.position, this.position);
        d = Vector.magnitude(d)

        if (d < this.recordDist) {
            this.recordDist = d
        }
        if (!this.hitTarget) {
            this.finishTime++;
        }
        var temp = this.genome.sequence[this.geneCounter];
        Object.assign(this.force, temp);
        this.geneCounter++;
    }

}