const { Engine, World, Render, Bodies, Runner } = Matter;

const engine = Engine.create();
const { world } = engine;

const cells = 3;
const width = 600;
const height = 600;

const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes: true, //It will make a solid shape
    width: width,
    height: height
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
  Bodies.rectangle(width / 2, 0, width, 40, { isStatic: true }),
  Bodies.rectangle(width / 2, height, width, 40, { isStatic: true }),
  Bodies.rectangle(0, height / 2, 40, height, { isStatic: true }),
  Bodies.rectangle(width, height / 2, 40, height, { isStatic: true })
];
World.add(world, walls);

// Maze Generation
const grid = Array(cells)
  .fill(null)
  .map(() => Array(cells).fill(false));

const verticals = Array(cells)
  .fill(null)
  .map(() => Array(cells - 1).fill(false));

const horizontals = Array(cells - 1)
  .fill(null)
  .map(() => Array(cells).fill(false));

// Stating Points

const startRow = Math.floor(Math.random() * cells);
const startColumn = Math.floor(Math.random() * cells);

console.log({ Row: startRow, Column: startColumn });

//Function

const stepThroughCell = (row, column) => {
  // If I visited then return
  // Mark As Visited
  // Assemble rendomly-orderd list of neighbor
  // for Each Neighbor...
  // See if that neighbor are out of bounds
  // If we visited to neighbor Then continue to the next neighbor
  // Remove the wall either horizontal or vertical
  // Visit the next cell
};

stepThroughCell(startRow, startColumn);
