import { Input, printGrid } from "./utils";

const nextMoveIsValid = (
  rock: boolean[][],
  grid: boolean[][],
  r: number,
  c: number
): boolean => {
  if (r < 0) {
    return false;
  }

  for (let y = 0; y < rock.length; y++) {
    for (let x = 0; x < rock[y].length; x++) {
      if (grid[r + y]?.[c + x] && rock[y][x]) {
        return false;
      }
    }
  }
  return true;
};

const jetPush = (
  grid: boolean[][],
  r: number,
  c: number,
  jets: string[],
  jetIndex: number,
  rock: boolean[][]
): number => {
  let newC = c;

  let jet = jets[jetIndex];
  if (jet === ">") {
    for (let y = 0; y < rock.length; y++) {
      for (let x = 0; x < rock[y].length; x++) {
        if (grid[r + y]?.[c + 1 + x] && rock[y][x]) {
          return newC;
        }
      }
    }
    if (c + rock[0].length < 7) {
      newC = c + 1;
    }
  } else if (jet === "<") {
    for (let y = 0; y < rock.length; y++) {
      for (let x = 0; x < rock[y].length; x++) {
        if (grid[r + y]?.[c - 1 + x] && rock[y][x]) {
          return newC;
        }
      }
    }
    if (c > 0) {
      newC = c - 1;
    }
  }
  return newC;
};

const runRound = (
  rock: boolean[][],
  startingJetIndex: number,
  jets: string[],
  grid: boolean[][]
): number => {
  //add rows until there are three blank ones
  while (
    grid[grid.length - 1].includes(true) ||
    grid[grid.length - 2].includes(true) ||
    grid[grid.length - 3].includes(true) ||
    grid[grid.length - 4].includes(true)
  ) {
    grid.push(new Array(7).fill(false));
  }
  let c = 2;
  let r = grid.length - 1;
  //going to try not having the whole rock there at once
  let jetIndex = startingJetIndex;
  while (true) {
    c = jetPush(grid, r, c, jets, jetIndex, rock);
    jetIndex = (jetIndex + 1) % jets.length;
    if (!nextMoveIsValid(rock, grid, r - 1, c)) {
      break;
    }
    r--;
  }
  for (let y = 0; y < rock.length; y++) {
    for (let x = 0; x < rock[y].length; x++) {
      grid[r + y][c + x] = rock[y][x] || grid[r + y][c + x];
    }
  }
  return jetIndex;
};

const runSimulation = (input: Input, rounds: number): number => {
  let rockIndex = 0;
  let jetIndex = 0;
  for (let i = 0; i < rounds; i++) {
    jetIndex = runRound(
      input.rocks[rockIndex],
      jetIndex,
      input.jets,
      input.grid
    );
    rockIndex = (rockIndex + 1) % 5;
  }
  for (let i = 0; i < input.grid.length; i++) {
    if (!input.grid[i].includes(true)) {
      return i;
    }
  }
  return -1;
};

export { runSimulation };
