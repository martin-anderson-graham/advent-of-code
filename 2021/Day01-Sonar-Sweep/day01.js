/*
let input = [
607,
618,
618,
617,
647,
716,
769,
792,
];
*/




var fs = require('fs');
var path = require('path');

var input = fs.readFileSync(path.resolve(__dirname, "./input.txt")).toString().split("\n");
for (let idx = 0; idx < input.length; idx++) {
  input[idx] = Number(input[idx]);
}


let countIncreases = (arr) => {
  let increaseCount = 0;
  for (let idx = 1; idx < arr.length; idx++) {
    if (arr[idx] > arr[idx - 1]) {
      increaseCount++;
    }
  }
  return increaseCount;
};

let createWindowSums = (winSize, arr) => {
  let slidingSums = [];
  for (let idx = 0; idx < arr.length - 2; idx++) {
    slidingSums.push(arr[idx] + arr[idx + 1] + arr[idx + 2]);
  }
  return slidingSums;
}

console.log(countIncreases(createWindowSums(3, input)));
