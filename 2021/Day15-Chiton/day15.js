let path = require('path');
let fs = require('fs');

let inputString = './input2.txt';

let input = fs.readFileSync(path.resolve(__dirname, inputString)).toString().split(/\r?\n/).map(ele => ele.split('').map(r => Number(r)));

let endCoordinates = [0, 0];
let minScore = Number.MAX_SAFE_INTEGER;

let minPathsFromStartingPoints = {};

let addArr = (arr1, arr2) => {
  let result = [];
  for (let idx = 0; idx < arr1.length; idx++) {
    result.push(arr1[idx] + arr2[idx]);
  }
  return result;
};

let isLegalPoint = (grid, point) => {
  if (point[0] < 0 || point[0] >= grid.length) {
    return false;
  } else if (point[1] < 0 || point[1] >= grid[0].length) {
    return false;
  } else {
    return true;
  }
}

let arrIncludes = (arr1, arr2) => {
  for (let idx = 0; idx < arr1.length; idx++) {
    let contains = true;
    for (let c = 0; c < arr2.length; c++) {
      if (arr1[idx][c] !== arr2[c]) {
        contains = false;
      }
    }
    if (contains) {
      return true;
    }
  }
  return false;
}

let scorePath = (grid, path) => {
  return path.reduce((sum, point) => sum + grid[point[0]][point[1]], 0);
}

let reachedEnd = (point) => {
  return (point[0] === endCoordinates[0] && point[1] === endCoordinates[1]);
}

let buildPathScore = (grid, path) => {
  let deltas = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  let downStreamScores = [];
  for (let p of deltas) {
    let nextPoint = addArr(p, path[path.length - 1]);
    if (!isLegalPoint(grid, nextPoint) || arrIncludes(path, nextPoint)) {
      continue;
    } else if (reachedEnd(nextPoint)) {
      let newPath = path.slice();
      newPath.push(nextPoint);
      downStreamScores.push(scorePath(grid, newPath));
    } else if (Object.keys(minPathsFromStartingPoints).includes(nextPoint.toString())) {
      let currentPathScore = scorePath(grid, path) + grid[nextPoint[0]][grid[nextPoint[1]]];
      if (currentPathScore > minPathsFromStartingPoints[nextPoint.toString()]) {
        currentPathScore = minPathsFromStartingPoints[nextPoint.toString()];
      }
      downStreamScores.push(currentPathScore);
    } else {
      let newPath = path.slice();
      newPath.push(nextPoint);
      downStreamScores.push(buildPathScore(grid, newPath));
    }
  }
  let min = downStreamScores.sort((a, b) => a - b)[0];
  if (min < minPathsFromStartingPoints[path[path.length - 1].toString()] || !minPathsFromStartingPoints[path[path.length - 1].toString()]) {
    minPathsFromStartingPoints[path[path.length - 1].toString()] = min;
  }

  return min;
};

input = [ [1, 2, 6],[3, 2, 1], [1, 2, 2]];
endCoordinates = [0, 0];



console.log(buildPathScore(input, [[input.length - 1, input[0].length - 1]]));
console.log(...Object.entries(minPathsFromStartingPoints));