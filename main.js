const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Vector = Matter.Vector,
    Events = Matter.Events;

const engine = Engine.create();
const world = engine.world;
const target = Bodies.circle(window.innerWidth / 2, window.innerHeight * .1, 10, {
    isStatic: true
});
let population;

const obstacle = Bodies.rectangle(
    window.innerWidth * .5, window.innerHeight * .5,
    300, 10, {
    isStatic: true
});

function setup() {
    // create an engine
    noCanvas();
    engine.world.gravity.y = 0;

    // create a renderer
    const render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            // wireframes: false
        }
    });

    population = new Population(engine.world);

    World.add(engine.world, [target, obstacle]);

    Render.run(render);
}

function draw() {
    population.run();
    Engine.update(engine);
    document.getElementById("p1").innerHTML = `cycles left: ${200 - population.cycle}`
    document.getElementById("p2").innerHTML = `generation: ${population.generation}`
}


Events.on(engine, "collisionStart", function (event) {
    let pairs = event.pairs
    for (let i = 0; i < pairs.length; i++) {
        let bodyA = pairs[i].bodyA
        let bodyB = pairs[i].bodyB
        if (bodyA === obstacle || bodyB === obstacle) {
            if (bodyA != obstacle) {
                World.remove(world, bodyA);
            }
            if (bodyB != obstacle) {
                World.remove(world, bodyB);
            }
        }
    }
})

