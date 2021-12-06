var path = require('path');
var fs = require('fs');

let inputString = './input.txt';
let input = fs.readFileSync(path.resolve(__dirname,inputString)).toString().split(',').map( ele => Number(ele));

let fishList = [0, 0, 0, 0, 0, 0, 0, 0];

input.forEach( (element, index) => fishList[element]++ );

let updateFishList = (fList) => {
  let newFish = fList[0];
  for (let idx = 0; idx < fList.length - 1; idx++) {
    fList[idx] = fList[idx + 1];
  }
  fList[6] += newFish;
  fList[8] = newFish;
};

let sumFishList = (fList) => {
  return fList.reduce( (a, b) => {
    return a + b
  }, 0);
};

let days = 256;

for (let idx = 0; idx < days; idx++) {
  updateFishList(fishList);
}

console.log(sumFishList(fishList));

