const parseInput = (str: string): number[][] => {
  return str
    .split("\n\n")
    .map((elfString) => elfString.split("\n").map((e) => Number(e)));
};

const reduceSum = (sum: number, e: number): number => sum + e;

const part1 = (arr: number[][]): number => {
  return Math.max(...arr.map((elf) => elf.reduce(reduceSum, 0)));
};

const part2 = (arr: number[][]): number => {
  return arr
    .map((elf) => elf.reduce(reduceSum, 0))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce(reduceSum, 0);
};

export { parseInput, part1, part2 };
