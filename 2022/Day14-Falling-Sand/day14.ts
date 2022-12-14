type Input = {
  grid: number[][];
  maxY: number;
  maxX: number;
};
const parseInput = (str: string): Input => {
  let maxX = -Infinity;
  let maxY = -Infinity;
  str.split("\n").forEach((row) => {
    row.split(" -> ").forEach((pair) => {
      let y = Number(pair.split(",")[1]);
      let x = Number(pair.split(",")[0]);
      if (y > maxY) {
        maxY = y;
      }
      if (x > maxX) {
        maxX = x;
      }
    });
  });

  let grid: number[][] = [];
  for (let i = 0; i < maxY + 1; i += 1) {
    grid.push(new Array(maxX + 1).fill(0));
  }

  str.split("\n").forEach((row) => {
    let rowArr = row.split(" -> ");
    for (let i = 0; i < rowArr.length - 1; i += 1) {
      let p1 = rowArr[i].split(",").map((e) => Number(e));
      let p2 = rowArr[i + 1].split(",").map((e) => Number(e));

      if (p1[0] === p2[0]) {
        let minY = Math.min(p1[1], p2[1]);
        let maxY = Math.max(p1[1], p2[1]);
        for (let j = minY; j <= maxY; j++) {
          grid[j][p1[0]] = 1;
        }
      }
      if (p1[1] === p2[1]) {
        let minX = Math.min(p1[0], p2[0]);
        let maxX = Math.max(p1[0], p2[0]);
        for (let j = minX; j <= maxX; j++) {
          grid[p1[1]][j] = 1;
        }
      }
    }
  });
  return {
    maxY,
    maxX,
    grid,
  };
};

const printGrid = (grid: number[][], starting = 0): void => {
  console.log(
    grid
      .map((r) => {
        return r.slice(starting).join("");
      })
      .join("\n")
  );
};

type Coordinate = {
  x: number;
  y: number;
};

//mutates grid and returns true if sand the sand came to a rest
const nextSandFalls = (grid: number[][]): boolean => {
  let current: Coordinate = {
    x: 500,
    y: 0,
  };
  while (true) {
    if (grid[current.y + 1] === undefined) {
      return false;
    } else if (grid[current.y][current.x] === undefined) {
      return false;
    } else if (grid[current.y + 1][current.x] === 0) {
      current.y += 1;
    } else if (grid[current.y + 1][current.x - 1] === 0) {
      current.y += 1;
      current.x -= 1;
    } else if (grid[current.y + 1][current.x + 1] === 0) {
      current.y += 1;
      current.x += 1;
    } else {
      break;
    }
  }
  grid[current.y][current.x] = 2;
  return true;
};

const part1 = (grid: number[][]): number => {
  while (true) {
    let sandStopped = nextSandFalls(grid);
    if (!sandStopped) {
      break;
    }
  }
  return grid.reduce((ele, row) => {
    return (
      ele +
      row.reduce((sum, val) => {
        return val === 2 ? sum + 1 : sum;
      }, 0)
    );
  }, 0);
};

//mutates grid and returns true if sand the sand came to a rest
const nextSandFalls2 = (grid: number[][], maxY: number): boolean => {
  let current: Coordinate = {
    x: 500,
    y: 0,
  };

  while (true) {
    if (grid[current.y + 1][current.x] === 0) {
      current.y += 1;
    } else if (grid[current.y + 1][current.x - 1] === 0) {
      current.y += 1;
      current.x -= 1;
    } else if (grid[current.y + 1][current.x + 1] === 0) {
      current.y += 1;
      current.x += 1;
      grid.forEach((row, rIdx) => {
        if (rIdx === maxY + 2) {
          row.push(1);
        } else {
          row.push(0);
        }
      });
    } else {
      break;
    }
  }
  grid[current.y][current.x] = 2;
  return true;
};

const part2 = (grid: number[][], maxY: number): number => {
  grid.push(new Array(grid[0].length).fill(0));
  grid.push(new Array(grid[0].length).fill(1));

  while (true) {
    nextSandFalls2(grid, maxY);
    if (grid[0][500] === 2) {
      break;
    }
  }
  return grid.reduce((ele, row) => {
    return (
      ele +
      row.reduce((sum, val) => {
        return val === 2 ? sum + 1 : sum;
      }, 0)
    );
  }, 0);
};
export { parseInput, printGrid, part1, part2 };
