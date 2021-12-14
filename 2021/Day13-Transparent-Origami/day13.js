let path = require('path');
let fs = require('fs');

let inputString = './input.txt';

let input = fs.readFileSync(path.resolve(__dirname, inputString)).toString().split(/\n/);

let points = [];
let folds = [];
let addingPoints = true;
for (let line of input) {
  if (line === '-') {
    addingPoints = false;
  } else if (addingPoints) {
    points.push(line.split(',').map(ele => Number(ele)));
  } else {
    folds.push(line.split(' ')[2].split('=').map(ele => {
      if (ele === 'y' || ele === 'x') {
        return ele;
      } else {
        return Number(ele);
      }
    }));
  }
}


let buildPaper = (pointsArr) => {
  let rows = 0;
  let cols = 0;
  pointsArr.forEach(point => {
    if (point[1] > rows) {
      rows = point[1];
    }
    if (point[0] > cols) {
      cols = point[0];
    }
  });
  let result = [];
  for (let r = 0; r < rows + 1; r++) {
    let tempRow = [];
    for (let c = 0; c < cols + 1; c++) {
      tempRow.push(0);
    }
    result.push(tempRow);
  }

  pointsArr.forEach(point => {
    result[point[1]][point[0]] = 1;
  });
  return result;
}

let printPaper = (paper) => {
  for (let l of paper) {
    let result = '';
    for (let idx = 0; idx < l.length; idx++) {
      if(l[idx]) {
        result += '##';
      } else {
        result += '  ';
      }
    }
    console.log(result);
  }
  console.log('\n');
};

let foldUp = (paper, rowIndex) => {
  let result = [];
  let colLength = paper[0].length;
  if (rowIndex < (paper.length - 1) / 2) {
    let targetLength = 2* (paper.length  - 1 - rowIndex) + 1;
    while (paper.length < targetLength) {
      let tempRow = new Array(colLength).fill(0);
      paper.unshift(tempRow);
      rowIndex++;
    }
  } else if (rowIndex > (paper.length - 1) / 2) {
    let targetLength = 2* (rowIndex) + 1;
    while (paper.length < targetLength) {
      let tempRow = new Array(colLength).fill(0);
      paper.push(tempRow);
    }
  }
  for (let rIndex = 0; rIndex < rowIndex; rIndex++) {
    result.push([]);
    for (let cIndex = 0; cIndex < paper[rIndex].length; cIndex++) {
      result[rIndex][cIndex] = paper[rIndex][cIndex] + paper[paper.length - 1 - rIndex][cIndex];
    }
  }
  return result;
};

let foldLeft = (paper, rowIndex) => {
  let result = [];
  for (let idx = 0; idx < paper.length; idx++) {
    result.push([]);
    if (rowIndex < (paper[idx].length - 1) / 2) {
      let targetLength = 2* (paper[idx].length  - 1 - rowIndex) + 1;
      while (paper[idx].length < targetLength) {
        paper[idx].unshift(0);
        rowIndex++;
      }
    } else if (rowIndex > (paper[idx].length - 1) / 2) {
      let targetLength = 2* (rowIndex) + 1;
      while (paper[idx].length < targetLength) {
        paper[idx].push(0);
      }
    }
    let left = paper[idx].slice(0, rowIndex);
    let right = paper[idx].slice(rowIndex + 1).reverse();
    for (let c = 0; c < left.length; c++) {
      result[idx].push(left[c] + right[c]);
    }
  }
  return result;
};

let countPoints = (paper) => {
  return paper.reduce( (sum, row) => {
    return sum + row.filter( ele => ele).length;
  }, 0);
}

let processPaper = (points, instructions) => {
  let paper = buildPaper(points);
  instructions.forEach( arr => {
    if (arr[0] === 'x') {
      paper = foldLeft(paper, arr[1]);
    } else {
      paper = foldUp(paper, arr[1]);
    }
  });
  return paper;
}

let sumPaper = (paper) => {
  return paper.reduce ( (sum, row) => {
    return sum + row.reduce( (sum, ele) => {
      return sum + ele;
    }, 0)
  }, 0);
};


let paper = processPaper(points, folds);
printPaper(paper);
/*
let newPaper = [
  [1,0,0,0,0,0,0,1,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
];

printPaper(foldUp(newPaper, 3));
*/

/*
CJCKBAPB
*/
