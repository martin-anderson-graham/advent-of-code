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

const findMinRiskPath = (inputArr) => {
  let minArr = [];
  for (let row = 0; row < inputArr.length; row++) {
    minArr.push(new Array(inputArr[row].length));
    for (let col = 0; col < inputArr[row].length; col++) {
      if (row === 0 && col === 0) {
        minArr[row][col] = 0;
      } else if (row === 0) {
        minArr[row][col] = inputArr[row][col] + minArr[row][col - 1];
      } else if (col === 0) {
        minArr[row][col] = inputArr[row][col] + minArr[row - 1][col];
      } else {
        minArr[row][col] = Math.min(
          inputArr[row][col] + minArr[row - 1][col],
          inputArr[row][col] + minArr[row][col - 1]
        );
      }
    }
  }
  return minArr[minArr.length - 1][minArr[0].length - 1];
};

module.exports = {
  readInput,
  findMinRiskPath,
};

