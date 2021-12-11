let path = require('path');
let fs = require('fs');

let inputString = './input.txt';
let input = fs.readFileSync(path.resolve(__dirname, inputString)).toString().split(/\r?\n/).map( row => row.split('').map( ele => Number(ele)));

let printGrid = (grid) => {
  for(let idx = 0; idx< grid.length; idx++) {
    console.log(grid[idx].toString());
  }
  console.log('\n');
};

let incrementGrid = (grid) => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      grid[row][col]++;
    }
  }
}

let energyReset = (grid, flashGrid) => {
  grid.forEach( (row, rIndex) => {
    row.forEach( (col, cIndex) => {
      if (flashGrid[rIndex][cIndex]) {
        grid[rIndex][cIndex] = 0;
      }
    });
  });
};

let updateNeighbors = (grid, row, col) => {
  let delta = [-1, 0, 1];
  for( let r of delta) {
    for (let c of delta) {
      if (grid[row + r] && grid[row + r][col + c]) {
        grid[row +r][col + c]++;
      }
    }
  }
};

let updateFlashGrid = (grid, flashGrid) => {
  let flashOccured = false;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (flashGrid[row][col]) {
        continue;
      }
      if (grid[row][col] > 9) {
        flashOccured = true;
        flashGrid[row][col] = true;
        updateNeighbors(grid, row, col);
      }
    }
  }
  return flashOccured;
}

let countFlashesSingleStep = (grid) => {
  let flashRecord = grid.map( row => row.map( ele => false));
  incrementGrid(grid);
  while(true) {
    let didFlash = updateFlashGrid(grid, flashRecord);
    if (!didFlash) {
      break;
    }
  }
  energyReset(grid, flashRecord);
  return flashRecord.reduce( (sum, row) => sum + row.reduce( (sum, ele) => sum + Number(ele) , 0) , 0);
};

let countFlashes = (grid, steps) => {
  let sum = 0;
  for (let idx = 0; idx < steps; idx++) {
    sum += countFlashesSingleStep(grid);
  }
  return sum;
};

let findSynchronizedFlash = (grid) => {
  let gridSize = grid.length * grid[0].length;
  let count = 0;
  while (true) {
    count++;
    let numFlashes = countFlashesSingleStep(grid);
    if (numFlashes === gridSize) {
      return count;
    }
  }
}

//console.log( countFlashes(input, 100) );
console.log(findSynchronizedFlash(input));