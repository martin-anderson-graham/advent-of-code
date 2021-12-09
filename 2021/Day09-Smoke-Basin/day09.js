let path = require('path');
let fs = require('fs');

let inputString = './input.txt';

let input = fs.readFileSync(path.resolve(__dirname, inputString)).toString().split(/\r?\n/).map(ele => ele.split('').map(val => Number(val)));

let isLowPoint = (grid, row, col) => {
  let value = grid[row][col];

  if (row - 1 >= 0) {
    if (grid[row - 1][col] <= value) {
      return false;
    }
  }

  if (row + 1 < grid.length) {
    if (grid[row + 1][col] <= value) {
      return false;
    }
  }

  if (col + 1 < grid[row].length) {
    if (grid[row][col + 1] <= value) {
      return false;
    }
  }

  if (col - 1 >= 0) {
    if (grid[row][col - 1] <= value) {
      return false;
    }
  }
  return true;
}

let sumRiskLevel = (grid) => {
  let sum = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (isLowPoint(grid, row, col)) {
        sum += grid[row][col] + 1;
      }
    }
  }
  return sum;
}

let getAllLowPoints = (grid) => {
  let result = [];
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (isLowPoint(grid, row, col)) {
        result.push([row, col]);
      }
    }
  }
  return result;
}

let getListOfLiveNeighbors = (grid, row, col) => {
  let result = [[row + 1, col], [row - 1, col], [row, col - 1], [row, col + 1]];
  result = result.filter(arr => {
    if (arr[0] < 0 || arr[0] === grid.length) {
      return false;
    } else if (arr[1] < 0 || arr[1] === grid[row].length) {
      return false;
    } else if (grid[arr[0]][arr[1]] !== 9) {
      return true;
    }
    return false;
  });
  return result;
};

let pointInArr = (arr, point) => {
  if (arr.length === 0) {
    return 0;
  }
  return arr.filter(arrPoint => {
    if (arrPoint[0] === point[0] && arrPoint[1] === point[1]) {
      return true;
    }
    return false;
  }).length;
};

let getBasinSize = (grid, lowPoint) => {
  let livePoints = [lowPoint];
  let includedPoints = [];
  while (livePoints.length) {
    let tempLivePoints = [];
    for (let idx = 0; idx < livePoints.length; idx++) {
      let liveNeighbors = getListOfLiveNeighbors(grid, livePoints[idx][0], livePoints[idx][1]);
      liveNeighbors.forEach( point => {
        if( !pointInArr(livePoints, point) && !pointInArr(includedPoints, point) && !pointInArr(tempLivePoints, point)){
          tempLivePoints.push(point);
        }
      });
    }
    includedPoints = includedPoints.concat(livePoints);
    livePoints = tempLivePoints;
  }
  return includedPoints.length;
}

let lowPoints = getAllLowPoints(input);
let basinSizes = lowPoints.map(ele => getBasinSize(input, ele));

console.log(basinSizes.sort((a, b) => b - a).slice(0, 3).reduce((product, ele) => ele * product, 1));