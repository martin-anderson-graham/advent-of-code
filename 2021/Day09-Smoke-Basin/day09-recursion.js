let path = require('path');
let fs = require('fs');

let inputString = './input.txt';

let input = fs.readFileSync(path.resolve(__dirname, inputString)).toString().split(/\r?\n/).map(ele => [9].concat(ele.split('').map(val => Number(val)), [9]));

input.push(new Array(input[0].length).fill(9));
input.unshift(new Array(input[0].length).fill(9));

let isLower = (grid, point1, point2) => {
  return (grid[point1[0]][point1[1]] < grid[point2[0]][point2[1]]);
}

let pointSum = (point1, point2) => {
  return [point1[0]+point2[0], point1[1]+point2[1]];
}

let nearestLowPoint = (grid, pointArr) => {
  let deltas = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let lowest = pointArr;
  for (let point of deltas) {
    if(isLower(grid, pointSum(point, pointArr), pointArr)) {
        lowest = nearestLowPoint(grid, pointSum(point, pointArr));
        break;
      }
    }
  return lowest;
  };

let determineBasinSizesSorted = (grid) => {
  let lowPoints = {};
  for (let row =  0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 9) {
        continue;
      }
      let lp = String(nearestLowPoint(grid, [row, col]));
      lowPoints[lp] = lowPoints[lp] + 1 || 1;
    }
  }
  return Object.values(lowPoints).sort( (a, b) => b - a);
};

console.log(determineBasinSizesSorted(input).slice(0,3).reduce( (a,b) => a * b, 1));