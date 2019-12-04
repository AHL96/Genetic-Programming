const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector,
    Events = Matter.Events;

const width = window.innerWidth
const height = window.innerHeight
const GENOME_LENGTH = 500

const engine = Engine.create();
engine.world.gravity.y = 0;
const world = engine.world;

const target = Bodies.circle(width * .9, height * .9, 10, {
    isStatic: true
});
let population;

const walls = [
    Bodies.rectangle(width * .3, height * .25, 10, 400, { isStatic: true }),
    Bodies.rectangle(width * .6, height * .75, 10, 400, { isStatic: true }),
    // walls
    Bodies.rectangle(width / 2, 5, width, 10, { isStatic: true }),
    Bodies.rectangle(width / 2, height - 5, width, 10, { isStatic: true }),
    Bodies.rectangle(5, height / 2, 10, height, { isStatic: true }),
    Bodies.rectangle(width - 5, height / 2, 10, height, { isStatic: true })
]

World.add(world, walls);


function setup() {
    // create an engine
    noCanvas();
    engine.world.gravity.y = 0;

    // create a renderer
    const render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: width,
            height: height,
            // wireframes: false
        }
    });

    population = new Population(engine.world);

    World.add(engine.world, [target]);

    Render.run(render);
}

function draw() {
    population.run();
    Engine.update(engine);
    document.getElementById("p1").innerHTML = `cycles left: ${GENOME_LENGTH - population.cycle}`
    document.getElementById("p2").innerHTML = `generation: ${population.generation}`
}


Events.on(engine, "collisionStart", (event) => {
    let pairs = event.pairs
    for (let i = 0; i < pairs.length; i++) {
        let bodyA = pairs[i].bodyA
        let bodyB = pairs[i].bodyB

        const bodyAIndex = walls.indexOf(bodyA);
        const bodyBIndex = walls.indexOf(bodyB);

        if (bodyAIndex !== -1 && bodyBIndex === -1) {
            World.remove(world, bodyB)
        }


    }
})

