const parseInput = (str: string): boolean[][] => {
  return str.split("\n").map((row) => {
    return row.split("").map((e) => e === "#");
  });
};

const printGrid = (arr: boolean[][]) => {
  let newArr = arr
    .map((row) => {
      return row
        .map((v) => {
          if (v) {
            return "#";
          } else {
            return ".";
          }
        })
        .join("");
    })
    .join("\n");
  console.log(newArr);
};

const checkLight = (
  arr: boolean[][],
  r: number,
  c: number,
  part2 = false
): boolean => {
  if (part2) {
    if (
      (r === 0 && c === 0) ||
      (r === arr.length - 1 && c === 0) ||
      (r === 0 && c === arr[0].length - 1) ||
      (r === arr.length - 1 && c === arr[0].length - 1)
    ) {
      return true;
    }
  }

  let neighborOnCount = 0;

  let changes: number[][] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  changes.forEach((change) => {
    if (arr[r + change[0]]) {
      if (arr[r + change[0]][c + change[1]]) {
        neighborOnCount++;
      }
    }
  });

  if (arr[r][c]) {
    return neighborOnCount === 2 || neighborOnCount === 3;
  } else {
    return neighborOnCount === 3;
  }
};

const part1 = (arr: boolean[][], steps: number, part2 = false): number => {
  let currentArr: boolean[][] = JSON.parse(JSON.stringify(arr));
  for (let i = 0; i < steps; i += 1) {
    let nextArr: boolean[][] = [];
    for (let r = 0; r < currentArr.length; r += 1) {
      nextArr.push([]);
      for (let c = 0; c < currentArr[r].length; c += 1) {
        nextArr[r].push(checkLight(currentArr, r, c, part2));
      }
    }
    currentArr = nextArr;
  }
  return currentArr
    .map((row) => {
      return row.filter((e) => e).length;
    })
    .reduce((sum, r) => sum + r);
};

export { parseInput, part1 };
