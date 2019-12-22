const {
  Engine,
  World,
  Render,
  Bodies,
  Runner,
  MouseConstraint,
  Mouse
} = Matter;

const engine = Engine.create();
const { world } = engine;

const width = 800;
const height = 600;

const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: false, //It will make a solid shape
    width: width,
    height: height
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Mouse Effect
World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas)
  })
);

// const shape = Bodies.rectangle(X-Axis, Y-Axis, Hight, Width, {
//   isStatic: true //Prevent from Falling
// });

// World.add(world, shape);

// Walls
const walls = [
  Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
  Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
  Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
  Bodies.rectangle(800, 300, 40, 600, { isStatic: true })
];
World.add(world, walls);

// Random shapes

for (let i = 0; i < 50; i++) {
  if (Math.random() > 0.5) {
    World.add(
      world,
      Bodies.rectangle(Math.random() * width, Math.random() * height, 50, 50, {
        render: {
          fillStyle: 'lime'
        }
      })
    );
  } else {
    World.add(
      world,
      Bodies.circle(Math.random() * width, Math.random() * height, 35)
    );
  }
}
