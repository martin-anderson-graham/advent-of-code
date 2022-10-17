let path = require("path");
let fs = require("fs");

const readInput = (inputFileName) => {
  let input = fs
    .readFileSync(path.resolve(__dirname, `./${inputFileName}.txt`))
    .toString()
    .split(/\r?\n/)
    .map((ele) => ele.split("").map((r) => Number(r)));
  return input;
};

const buildUsedArray = (inputArr) => {
  const used = [];
  for (let i = 0; i < inputArr[0].length; i++) {
    used.push(new Array(inputArr[0].length).fill(false));
  }
  return used;
};

const buildMinPaths = (inputArr) => {
  const result = [];
  for (let index = 0; index < inputArr.length; index++) {
    result.push(new Array(inputArr[0].length).fill(Infinity));
  }
  result[0][0] = 0;
  return result;
};

const someNodeIsUnvisited = (arr) => {
  return arr.some((row) => {
    return row.some((ele) => !ele);
  });
};

const getSmallestUnvisited = (used, minPaths) => {
  let [r, c] = [0, 0];
  let val = Infinity;
  for (let row = 0; row < used.length; row++) {
    for (let col = 0; col < used[row].length; col++) {
      if (!used[row][col]) {
        if (minPaths[row][col] < val) {
          val = minPaths[row][col];
          r = row;
          c = col;
        }
      }
    }
  }
  return [r, c];
};

const singlePathUpdate = (minPaths, r, c, val, inputArr) => {
  if (minPaths[r][c] === Infinity) {
    minPaths[r][c] = val + inputArr[r][c];
  } else {
    minPaths[r][c] = Math.min(minPaths[r][c], val + inputArr[r][c]);
  }
};

const updateNeighbors = (inputArr, minPaths, row, col) => {
  const currentVal = minPaths[row][col];
  if (row > 0) {
    singlePathUpdate(minPaths, row - 1, col, currentVal, inputArr);
  }
  if (row < inputArr.length - 1) {
    singlePathUpdate(minPaths, row + 1, col, currentVal, inputArr);
  }
  if (col > 0) {
    singlePathUpdate(minPaths, row, col - 1, currentVal, inputArr);
  }
  if (col < inputArr[0].length - 1) {
    singlePathUpdate(minPaths, row, col + 1, currentVal, inputArr);
  }
};
const findMinRiskPath = (inputArr) => {
  const used = buildUsedArray(inputArr);
  const minPaths = buildMinPaths(inputArr);
  while (someNodeIsUnvisited(used)) {
    const [r, c] = getSmallestUnvisited(used, minPaths);
    updateNeighbors(inputArr, minPaths, r, c);
    used[r][c] = true;
  }
  return minPaths[minPaths.length - 1][minPaths[0].length - 1];
};

const incrementAndWrap = (arr) => {
  let result = arr.map((row) => {
    return row.map((ele) => {
      let val = ele + 1;
      if (val === 10) {
        val = 1;
      }
      return val;
    });
  });
  return result;
};

function copyArr(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push([...arr[i]]);
  }
  return result;
}

const partTwoInput = (arr) => {
  let bigArr = [];
  for (let r = 0; r < 5; r++) {
    bigArr.push([]);
    for (let c = 0; c < 5; c++) {
      let toAdd = copyArr(arr);
      for (let i = 0; i < r + c; i++) {
        toAdd = incrementAndWrap(toAdd);
      }
      bigArr[r].push(toAdd);
    }
  }
  let result = [];
  bigArr.forEach((rowOfArr) => {
    for (let r = 0; r < rowOfArr[0].length; r++) {
      let row = [];
      for (let a = 0; a < rowOfArr.length; a++) {
        rowOfArr[a][r].forEach((ele) => row.push(ele));
      }
      result.push(row);
    }
  });

  return result;
};

module.exports = {
  readInput,
  findMinRiskPath,
  partTwoInput,
};
