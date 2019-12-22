const { Engine, World, Render, Bodies, Runner } = Matter;

const engine = Engine.create();
const { world } = engine;

const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
