let fs = require('fs');
let path = require('path');

let inputName = './input.txt';
let input = fs.readFileSync(path.resolve(__dirname, inputName)).toString().split(/\r?\n/);

let coordinates = input.map( element => {
  let point1 = element.split(' -> ')[0];
  let point2 = element.split(' -> ')[1];
  return [[Number(point1.split(',')[0]), 
            Number(point1.split(',')[1])
          ], [
              Number(point2.split(',')[0]),
              Number(point2.split(',')[1])
            ]];
});



let createGrid = (coordinateArray) => {
  let maxX = 0;
  let maxY = 0;
  let result = [];
  for(let idx = 0; idx < coordinateArray.length; idx++) {
    if (coordinateArray[idx][0][0] > maxX) {
      maxX = coordinateArray[idx][0][0];
    }
    if (coordinateArray[idx][1][0] > maxX) {
      maxX = coordinateArray[idx][1][0];
    }
    if (coordinateArray[idx][0][1] > maxY) {
      maxY = coordinateArray[idx][0][1];
    }
    if (coordinateArray[idx][1][1] > maxY) {
      maxY = coordinateArray[idx][1][1];      
    }
  }
  for (let x = 0; x <= maxX; x++) {
    result.push([]);
    for (let y = 0; y <= maxY; y++) {
      result[x].push(0);
    }
  }
  return result;
};

let printGrid = (gridArr) => {
  for (let y = 0; y < gridArr.length; y++) {
    let lineString = '';
    for (let x =0; x < gridArr[y].length; x++) {
      lineString += gridArr[y][x]
    }
    console.log(lineString);
  }
};

let isHorizontalOrVertical = ([point1, point2]) => {
  if (point1[0] === point2[0] && point1[1] !== point2[1]) {
    return true;
  } else if(point1[0] !== point2[0] && point1[1] === point2[1]) {
    return true;
  } else {
    return false;
  }
};

let updateGrid = ([point1, point2], gridArr) => {
  let xCoor = [point1[0], point2[0]].sort( (a, b) => a - b);
  let yCoor = [point1[1], point2[1]].sort( (a, b) => a - b);
  if(isHorizontalOrVertical([point1, point2])) {
    for (let x = xCoor[0]; x < xCoor[1] + 1; x++) {
      for (let y = yCoor[0]; y < yCoor[1] + 1; y++) {
        gridArr[y][x] ++;
      }
    }
  } else {
    let xCoor = [point1[0], point2[0]];
    let yCoor = [point1[1], point2[1]];
    let xChange = 1;
    let yChange = 1;
    let range = xCoor[0] - xCoor[1] > 0 ? xCoor[0] - xCoor[1] : xCoor[1] - xCoor[0]; 
    range++;
    if (xCoor[0] > xCoor[1]) {
      xChange = -1;
    }
    if (yCoor[0] > yCoor[1]) {
      yChange = -1;
    }
    for (let idx = 0; idx < range; idx++) {
      gridArr[yCoor[0] + yChange * idx][xCoor[0] + xChange * idx]++;
    }
  }
};

let countOverlappingSquares = (gridArr) => {
  let count = 0; 
  for (let y = 0; y < gridArr.length; y++) {
    for (let x = 0; x < gridArr[y].length; x++) {
      if (gridArr[y][x] !== '.' && gridArr[y][x] > 1) {
        count++;
      }
    }
  }
  return count;
};


let grid = createGrid(coordinates);

for (let idx = 0; idx < coordinates.length; idx++) {
  updateGrid(coordinates[idx], grid);
}

console.log(countOverlappingSquares(grid));




