const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Vector = Matter.Vector,
    Events = Matter.Events;

const width = window.innerWidth
const height = window.innerHeight
const GENERATION_LENGTH = 500

const engine = Engine.create();
engine.world.gravity.y = 0;
const world = engine.world;

const target = Bodies.circle(width * .9, height * .9, 10, {
    isStatic: true
});
let population;

const walls = [
    // walls
    Bodies.rectangle(width / 2, 5, width, 10, { isStatic: true }),
    Bodies.rectangle(width / 2, height - 5, width, 10, { isStatic: true }),
    Bodies.rectangle(5, height / 2, 10, height, { isStatic: true }),
    Bodies.rectangle(width - 5, height / 2, 10, height, { isStatic: true }),
    // obstacles
    Bodies.rectangle(width * .3, height * .25, 20, 400, { isStatic: true }),
    Bodies.rectangle(width * .6, height * .75, 20, 400, { isStatic: true }),
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
            wireframes: false
        }
    });

    population = new Population(engine.world);

    World.add(engine.world, [target]);

    Render.run(render);
}

function draw() {
    population.run();
    Engine.update(engine);
    document.getElementById("p1").innerHTML = `cycles left: ${GENERATION_LENGTH - population.cycle}`
    document.getElementById("p2").innerHTML = `generation: ${population.generation}`
}


Events.on(engine, "collisionStart", (event) => {
    let pairs = event.pairs
    for (let i = 0; i < pairs.length; i++) {
        let bodyA = pairs[i].bodyA
        let bodyB = pairs[i].bodyB

        if (bodyB.hasOwnProperty('alive') && bodyB.alive) {
            bodyB.render.fillStyle = "red"
            bodyB.alive = false

            if (bodyA === target) {
                bodyB.hitTarget = true;
                bodyB.alive = false;
                bodyB.render.fillStyle = "green"
            }
        }


    }
})