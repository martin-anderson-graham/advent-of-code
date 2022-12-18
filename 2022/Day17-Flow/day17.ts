import { Input, printGrid } from "./utils";

const nextMoveIsValid = (
  rock: boolean[][],
  jet: string,
  grid: boolean[][],
  r: number,
  c: number
): boolean => {
  return r >= 0;
};

const runRound = (
  rock: boolean[][],
  startingJetIndex: number,
  jets: string[],
  grid: boolean[][]
): number => {
  //add rows until there are three blank ones
  while (
    grid[grid.length - 1].includes(true) &&
    grid[grid.length - 2].includes(true) &&
    grid[grid.length - 3].includes(true) &&
    grid[grid.length - 4].includes(true)
  ) {
    grid.push(new Array(7).fill(false));
  }
  let c = 2;
  let r = grid.length - 1;
  //going to try not having the whole rock there at once
  let jetIndex = startingJetIndex;
  while (true) {
    let jet = jets[jetIndex];
    console.log(r, c, jet);
    if (jet === ">") {
      if (c + rock[0].length < 7) {
        c++;
      }
    } else if (jet === "<") {
      if (c > 0) {
        c--;
      }
    }
    jetIndex = (jetIndex + 1) % jets.length;
    if (!nextMoveIsValid(rock, jet, grid, r - 1, c)) {
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

const runSimulation = (input: Input, rounds: number): void => {
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

    printGrid(input.grid);
  }
};

export { runSimulation };
