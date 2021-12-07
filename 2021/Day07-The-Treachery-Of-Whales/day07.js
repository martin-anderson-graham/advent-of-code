let path = require('path');
let fs = require('fs');

let inputString = './input.txt';

let input = fs.readFileSync(path.resolve(__dirname, inputString)).toString().split(',').map( ele => Number(ele));

let determineFuelCostToMove = (currentPosition, targetPosition) => {
  let usedFuel = 0;
  let difference = Math.abs(currentPosition - targetPosition);
  let fuelPerStep = 1;
  for (let idx = 0; idx < difference; idx++) {
    usedFuel += fuelPerStep;
    fuelPerStep++;
  }
  return usedFuel;
};

let determineFuelCostToMoveAll = (crabArr, targetPosition) => {
  return crabArr.reduce ( (sum, ele) => sum + determineFuelCostToMove(ele, targetPosition), 0);
};

let findMinimumFuelCost = (crabArr) => {
  let fuelSums = [];
  let maxPos = crabArr.reduce( (max, ele) => {
    if (ele > max) {
      return ele;
    } else {
      return max;
    }
  }, 0);
  for (let pos = 0; pos < maxPos; pos++) {
    fuelSums.push(determineFuelCostToMoveAll(crabArr, pos));
  }
  return fuelSums.reduce( (min, ele) => {
    if (ele < min) {
      return ele;
    } else {
      return min;
    }
  }, 1000000000000000000000)
};

console.log(findMinimumFuelCost(input));