const { Engine, World, Render, Bodies, Runner } = Matter;

const engine = Engine.create();
const { world } = engine;

const cells = 5;
const width = 600;
const height = 600;

const unitLength = width / cells;

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

const shuffle = arr => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter--;

    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
};

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

//Function

const stepThroughCell = (row, column) => {
  // If I visited then return
  if (grid[row][column]) {
    return;
  }
  // Mark As Visited

  grid[row][column] = true;

  // Assemble rendomly-orderd list of neighbor

  const neighbors = shuffle([
    [row - 1, column, 'up'],
    [row, column + 1, 'right'],
    [row + 1, column, 'down'],
    [column - 1, row, 'left']
  ]);

  // for Each Neighbor...
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor;
    // See if that neighbor are out of bounds
    if (
      nextRow < 0 ||
      nextRow >= cells ||
      nextColumn < 0 ||
      nextColumn >= cells
    ) {
      continue;
    }
    // If we visited to neighbor Then continue to the next neighbor
    if (grid[nextRow][nextColumn]) {
      continue;
    }
    // Remove the wall either horizontal or vertical
    if (direction === 'left') {
      verticals[row][column - 1] = true;
    } else if (direction === 'right') {
      verticals[row][column] = true;
    } else if (direction === 'up') {
      horizontals[row - 1][column] = true;
    } else if (direction === 'down') {
      horizontals[row][column] = true;
    }
    stepThroughCell(nextRow, nextColumn);
  }
  // Visit the next cell
};

stepThroughCell(startRow, startColumn);

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength / 2,
      rowIndex * unitLength + unitLength,
      unitLength,
      10,
      {
        isStatic: true
      }
    );
    World.add(world, wall);
  });
});

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if (open) {
      return;
    }

    const wall = Bodies.rectangle(
      columnIndex * unitLength + unitLength,
      rowIndex * unitLength + unitLength / 2,
      10,
      unitLength,
      {
        isStatic: true
      }
    );
    World.add(world, wall);
  });
});
