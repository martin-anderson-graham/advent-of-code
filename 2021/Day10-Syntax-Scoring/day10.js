let path = require('path');
let fs = require('fs');
const { dirxml } = require('console');

let inputString = './input.txt';

let input = fs.readFileSync(path.resolve(__dirname, inputString)).toString().split(/\r?\n/);



let isCorrupt = (line) => {
  let symbols = ['[]', '<>', '{}', '()'];
  while (true) {
    let removing = false;
    for (let symbol of symbols) {
      if (line.includes(symbol)) {
        removing = true;
        line = line.replace(symbol, '');
      }
    }
    if(!removing){
      break;
    }
  }
  let legalSymbols = ['{', '[', '(', '<'];
  if(line.length === 0) {
    return [0, ''];
  } else if (line.split('').every(ele => legalSymbols.includes(ele))) {
    return [0, line];
  }
  let illegalSymbols = ['}', ']', ')', '>'];
  for (let idx = 0; idx < line.length; idx++) {
    if(illegalSymbols.includes(line[idx])) {
      return [idx, line[idx]];
    }
  }

};

let determineListOfIllegalCharacters = (lineArr) => {
  let foundIllegalSymbols = {};
  for (let line of lineArr) {
    let corrupt = isCorrupt(line);
    if(corrupt[0]) {
      foundIllegalSymbols[corrupt[1]] = foundIllegalSymbols[corrupt[1]] + 1 || 1;
    }
  }
  return foundIllegalSymbols;
}

let determineIllegalScore = (illegalSymbolsCountObj) => {
  let pointValue = {')':3, ']':57, '}':1197, '>':25137};
  let sum = 0;
  for (let key of Object.keys(illegalSymbolsCountObj)) {
    sum += illegalSymbolsCountObj[key] * pointValue[key];
  }
  return sum;
}

let determineLineCompletionCharacters = (line) => {
  let result = '';
  let lineArr = line.split('');
  let symbols = ['[]', '<>', '{}', '()'];
  while(lineArr.length){
    let char = lineArr.pop();
    for (let s = 0; s < 4; s++) {
      if(symbols[s].includes(char)) {
        result += symbols[s][1];
      }
    }
  }
  return result;
}

let determineCompletionScore = (lineArr) => {
  let scores = [];
  for (let idx = 0; idx < lineArr.length; idx++) {
    let values = {')': 1, ']': 2, '}': 3, '>': 4};
    let sum = 0;
    let corrupt = isCorrupt(lineArr[idx]);
    if (corrupt[0] === 0) {
      let missingChars = determineLineCompletionCharacters(corrupt[1]);
      for(let c = 0; c < missingChars.length; c++) {
        sum *= 5;
        sum += values[missingChars[c]];
      }
      scores.push(sum);
    }
  }
  return scores.sort( (a, b) => a - b)[(scores.length-1) / 2];
}

console.log(determineIllegalScore(determineListOfIllegalCharacters(input)));
console.log(determineCompletionScore((input)));