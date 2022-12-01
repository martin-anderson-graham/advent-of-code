const parseInput = (str: string): number[][] => {
  return str
    .split("\n\n")
    .map((elfString) => elfString.split("\n").map((e) => +e));
};

const reduceSum = (sum: number, e: number): number => sum + e;

const part1 = (arr: number[][]): number => {
  return Math.max(...arr.map((elf) => elf.reduce(reduceSum)));
};

const part2 = (arr: number[][]): number => {
  return arr
    .map((elf) => elf.reduce(reduceSum))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce(reduceSum);
};

export { parseInput, part1, part2 };
