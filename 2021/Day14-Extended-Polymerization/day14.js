let path = require('path');
let fs = require('fs');

let inputString = './input2.txt';

let input = fs.readFileSync(path.resolve(__dirname, inputString)).toString().split(/\r?\n/);

let polymer = input[0];

let pairs = input.slice(2).map( ele => ele.split(' -> '));

let findRulesToInsert = (poly, rules) => {
  let result = [];
  for ( let idx = 0; idx < poly.length - 1; idx++) {
    let rule = rules.find( ele => ele[0] === poly.slice(idx, idx + 2));
    result.push(rule);
  }
  return result;
};

let insertRules = (poly, rules) => {
  let result = '';
  for (let idx = 0; idx < poly.length - 1; idx++) {
    result += poly[idx];
    result += rules[idx][1];
  }
  result += poly[poly.length - 1];
  return result;
};

let iterateRules = (poly, rules, n) => {
  let result = poly;
  for (let idx = 0; idx < n; idx++) {
    result = insertRules(result, findRulesToInsert(result, rules));
  }

  return result;
}

let recursiveCount = (poly, rules, n, step) => {
  
}

let partOneScore = (poly) => {
  let letters = {};
  for (let idx = 0; idx < poly.length; idx++) {
    letters[poly[idx]] = letters[poly[idx]] + 1 || 1;
  }
  let counts = Object.values(letters).sort( (a, b) => a - b);
  return counts[counts.length - 1] - counts[0];
}

let newPoly = recursiveCount(polymer, pairs, 10);
console.log(partOneScore(newPoly));


