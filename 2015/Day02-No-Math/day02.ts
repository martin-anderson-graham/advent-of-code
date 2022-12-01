const computeSinglePaper = ([a, b, c]: number[]): number => {
  let areas = [a * b, a * c, b * c];
  return 2 * areas[0] + 2 * areas[1] + 2 * areas[2] + Math.min(...areas);
};

const parseInput = (str: string): number[][] => {
  return str.split("\n").map((r) => {
    return r.split("x").map((e) => +e);
  });
};

const totalPaper = (paperArr: number[][]): number => {
  return paperArr.reduce(
    (sum: number, ele: number[]) => sum + computeSinglePaper(ele),
    0
  );
};

const ribbon = ([a, b, c]: number[]): number => {
  let p = Math.min(2 * a + 2 * b, 2 * a + 2 * c, 2 * c + 2 * b);
  return p + a * b * c;
};

const totalRibbon = (paperArr: number[][]): number => {
  return paperArr.reduce((sum: number, ele) => sum + ribbon(ele), 0);
};

export { computeSinglePaper, parseInput, totalPaper, ribbon, totalRibbon };
