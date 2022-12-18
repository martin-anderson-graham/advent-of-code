type Input = {
  rocks: boolean[][][];
  jets: string[];
  grid: boolean[][];
};
let parseInput = (rockStr: string, jetString: string): Input => {
  let rocks = rockStr.split("\n\n").map((r) => {
    let arr = r.split("\n");
    let res: boolean[][] = [];
    for (let i = 0; i < arr.length; i++) {
      let row = arr[i].split("");
      res.push(row.map((v) => v === "#"));
    }
    return res.reverse();
  });
  let jets = jetString.split("");

  let grid: boolean[][] = [];
  for (let i = 0; i < 4; i++) {
    grid.push(new Array(7).fill(false));
  }
  return {
    rocks,
    jets,
    grid,
  };
};

const printGrid = (grid: boolean[][]): void => {
  console.log(
    grid
      .map((row) => {
        return "|" + row.map((v) => (v ? "#" : ".")).join("") + "|";
      })
      .reverse()
      .concat("---------")
      .join("\n")
  );
};

export { parseInput, printGrid, Input };
