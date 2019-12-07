class Creature extends Matter.Bodies.rectangle {
    constructor(world) {
        super(
            window.innerWidth * .1, window.innerHeight * .1,
            20, 10, {
            isSensor: false,
            mass: 5,
            collisionFilter: {
                group: -1
            },
            render: {
                fillStyle: "black",
                strokeStyle: "blue",
                lineWidth: 3
            }
        }
        );

        this.genome = new Genome();

        this.geneCounter = 0;
        this.alive = true;
        this.fitness = 0;

        this.finishTime = 0;
        this.hitTarget = false;
        this.endLocation = undefined

        if (world) {
            World.add(world, this);
        }

    }

    calcFitness = (target) => {
        let vect;
        if (this.endLocation === undefined) {
            vect = Vector.sub(target.position, this.position);
        } else {
            vect = Vector.sub(target.position, this.endLocation);
        }
        let dist = Vector.magnitude(vect)

        this.fitness = (1 / (this.finishTime * dist));
        this.fitness = Math.pow(this.fitness, 4);
    }

    run = () => {
        if (this.geneCounter < this.genome.size) {
            if (!this.hitTarget) {
                this.finishTime++;
            }

            if (this.alive) {
                var temp = this.genome.sequence[this.geneCounter];
                Body.applyForce(this, this.position, temp)

                // set rotation
                const h = Math.atan2(this.velocity.y, this.velocity.x)
                Body.setAngle(this, h)

                this.geneCounter++;
                this.endLocation = this.position
            }
        }
    }

}