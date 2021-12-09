let path = require('path');
let fs = require('fs');

let inputString = './input.txt';

let input = fs.readFileSync(path.resolve(__dirname, inputString)).toString().split(',').map( ele => Number(ele));

let determineFuelCostToMove = (currentPosition, targetPosition) => {
  let n = Math.abs(currentPosition - targetPosition);
  return (n * (n + 1) / 2);
};

let determineFuelCostToMoveAll = (crabArr, targetPosition) => {
  return crabArr.reduce ( (sum, ele) => sum + determineFuelCostToMove(ele, targetPosition), 0);
};

let findMinimumFuelCost = (crabArr) => {
  let fuelSums = [];
  let maxPos = crabArr.reduce( (max, ele) => ele > max? ele : max, 0);
  for (let pos = 0; pos < maxPos; pos++) {
    fuelSums.push(determineFuelCostToMoveAll(crabArr, pos));
  }
  return fuelSums.reduce( (min, ele) => ele < min? ele : min, 1000000000000000000000)
};

console.log(findMinimumFuelCost(input));