const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Vector = Matter.Vector,
    Events = Matter.Events;

const width = window.innerWidth
const height = window.innerHeight
const GENERATION_LENGTH = 1000

const world = World.create({
    gravity: {
        x: 0,
        y: 0
    }
})

const engine = Engine.create({
    enableSleeping: true,
    world: world
});

let population;
const wallOptions = {
    isStatic: true,
    render: {
        fillStyle: "black",
        strokeStyle: "white",
        lineWidth: 3
    }
}

const target = Bodies.circle(width * .9, height * .9, 10, wallOptions);

const walls = [
    // obstacles
    Bodies.rectangle(width * .3, height * .25, 20, 400, wallOptions),
    Bodies.rectangle(width * .6, height * .75, 20, 400, wallOptions),
    // walls
    Bodies.rectangle(width / 2, 5, width, 10, wallOptions),
    Bodies.rectangle(width / 2, height - 5, width, 10, wallOptions),
    Bodies.rectangle(5, height / 2, 10, height, wallOptions),
    Bodies.rectangle(width - 5, height / 2, 10, height, wallOptions),
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
    document.getElementsByTagName("li")[0].innerHTML = `cycles left: ${GENERATION_LENGTH - population.cycle}`
    document.getElementsByTagName("li")[1].innerHTML = `generation: ${population.generation}`
}


Events.on(engine, "collisionStart", (event) => {
    let pairs = event.pairs
    for (let i = 0; i < pairs.length; i++) {
        let bodyA = pairs[i].bodyA
        let bodyB = pairs[i].bodyB

        if (bodyB.hasOwnProperty('alive') && bodyB.alive) {
            bodyB.render.strokeStyle = "red"
            bodyB.alive = false

            if (bodyA === target) {
                bodyB.hitTarget = true;
                bodyB.alive = false;
                bodyB.render.strokeStyle = "green"
            }
        }


    }
})