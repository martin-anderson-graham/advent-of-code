type Input = {
  grid: number[][];
  start: number[];
  end: number[];
};

const parseInput = (str: string): Input => {
  let start = [0, 0];
  let end = [0, 0];
  let grid = str.split("\n").map((row, r) => {
    return row.split("").map((ele, c) => {
      if (ele === "S") {
        start = [r, c];
        return 0;
      } else if (ele === "E") {
        end = [r, c];
        return 25;
      } else {
        return ele.charCodeAt(0) - "a".charCodeAt(0);
      }
    });
  });
  return {
    grid,
    start,
    end,
  };
};

const findMinimumEnergy = (input: Input): number => {
  let energyGrid: number[][] = input.grid.map((row) => {
    let res: number[] = new Array(row.length).fill(Infinity);
    return res;
  });

  const walk = (r: number, c: number, energyToHere: number): void => {
    if (energyToHere < energyGrid[r][c]) {
      energyGrid[r][c] = energyToHere;
    } else {
      return;
    }

    if (r === input.start[0] && c === input.start[1]) {
      return;
    }

    let currentHeight = input.grid[r][c];

    if (
      input.grid?.[r]?.[c + 1] !== undefined &&
      input.grid[r][c + 1] + 1 >= currentHeight
    ) {
      walk(r, c + 1, energyToHere + 1);
    }

    if (
      input.grid?.[r]?.[c - 1] !== undefined &&
      input.grid[r][c - 1] + 1 >= currentHeight
    ) {
      walk(r, c - 1, energyToHere + 1);
    }

    if (
      input.grid?.[r + 1]?.[c] !== undefined &&
      input.grid[r + 1][c] + 1 >= currentHeight
    ) {
      walk(r + 1, c, energyToHere + 1);
    }

    if (
      input.grid?.[r - 1]?.[c] !== undefined &&
      input.grid[r - 1][c] + 1 >= currentHeight
    ) {
      walk(r - 1, c, energyToHere + 1);
    }
  };

  walk(input.end[0], input.end[1], 0);
  return energyGrid[input.start[0]][input.start[1]];
};

const findMinimumEnergyAnywhere = (input: Input): number => {
  let energyGrid: number[][] = input.grid.map((row) => {
    let res: number[] = new Array(row.length).fill(Infinity);
    return res;
  });

  const walk = (r: number, c: number, energyToHere: number): void => {
    if (energyToHere < energyGrid[r][c]) {
      energyGrid[r][c] = energyToHere;
    } else {
      return;
    }

    if (r === input.start[0] && c === input.start[1]) {
      return;
    }

    let currentHeight = input.grid[r][c];

    if (
      input.grid?.[r]?.[c + 1] !== undefined &&
      input.grid[r][c + 1] + 1 >= currentHeight
    ) {
      walk(r, c + 1, energyToHere + 1);
    }

    if (
      input.grid?.[r]?.[c - 1] !== undefined &&
      input.grid[r][c - 1] + 1 >= currentHeight
    ) {
      walk(r, c - 1, energyToHere + 1);
    }

    if (
      input.grid?.[r + 1]?.[c] !== undefined &&
      input.grid[r + 1][c] + 1 >= currentHeight
    ) {
      walk(r + 1, c, energyToHere + 1);
    }

    if (
      input.grid?.[r - 1]?.[c] !== undefined &&
      input.grid[r - 1][c] + 1 >= currentHeight
    ) {
      walk(r - 1, c, energyToHere + 1);
    }
  };

  walk(input.end[0], input.end[1], 0);
  let min = Infinity;
  input.grid.forEach((row, r) => {
    row.forEach((val, c) => {
      if (val === 0) {
        if (energyGrid[r][c] < min) {
          min = energyGrid[r][c];
        }
      }
    });
  });
  return min;
};
export { parseInput, findMinimumEnergy, findMinimumEnergyAnywhere };
