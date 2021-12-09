let path = require('path');
let fs = require('fs');
const { O_DSYNC } = require('constants');

let inputString = './input.txt';

let input = fs.readFileSync(path.resolve(__dirname, inputString)).toString().split(/\r?\n/).map(ele => {
  return ele.split(' | ').map(line => {
    return line.split(' ');
  })
});

let collapseMappings = (obj) => {
  let result = {};
  for (let entry of Object.entries(obj)) {
    result[entry[1].join('')] = entry[0];
  }
  return result;
}

let removeArrayElement = (arr, ele) => {
  let index = arr.indexOf(ele);
  if (index === -1) {
    return arr;
  } else {
    return arr.slice().splice(index, 1);
  }
}

let determineDigitWireMapping = (signalArr) => {
  let possibleWires = {
    0: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    1: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    2: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    3: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    4: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    5: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    6: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    7: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    9: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  };


  // find 1, 4, 7, 8
  for (let idx = 0; idx < signalArr.length; idx++) {
    if (signalArr[idx].length === 2) {
      possibleWires['1'] = signalArr[idx].split('').sort();
    } else if (signalArr[idx].length === 4) {  // find 4
      possibleWires['4'] = signalArr[idx].split('').sort();
    } else if (signalArr[idx].length === 3) { // find 7
      possibleWires['7'] = signalArr[idx].split('').sort();
    } else if (signalArr[idx].length === 7) {
      possibleWires['8'] = signalArr[idx].split('').sort();
    }
  }

  //find 6
  for (let idx = 0; idx < signalArr.length; idx++) {
    let code = signalArr[idx];
    if (code.length === 6) {
      if (!(code.split('').includes(possibleWires['1'][0]) && code.split('').includes(possibleWires['1'][1]))) {
        possibleWires['6'] = code.split('').sort();
      }
    }
  }

  //find 3
  for (let idx = 0; idx < signalArr.length; idx++) {
    let code = signalArr[idx];
    if (code.length === 5) {
      if (code.split('').includes(possibleWires['1'][0]) && code.split('').includes(possibleWires['1'][1])) {
        possibleWires['3'] = code.split('').sort();
        break;
      }
    }
  }

  // find 0 and 9 by combining 6 and 3 and seeing which makes 8
  for (let idx = 0; idx < signalArr.length; idx++) {
    let code = signalArr[idx];
    if (code.length === 6) {
      if (code.split('').sort().join('') === possibleWires['6'].join('')){
        continue;
      }
      let codeArray = code.split('');
      for (let v of possibleWires['3']) {
        if (!codeArray.includes(v)) {
          codeArray.push(v);
        }
      }
      if (codeArray.sort().join('') === 'abcdefg') {
        possibleWires['0'] = code.split('').sort();
      } else {
        possibleWires['9'] = code.split('').sort();
      }
    }
  }

  // find 2 and 5
  for (let idx = 0; idx < signalArr.length; idx++) {
    let code = signalArr[idx];
    if (code.length === 5) {
      if( code.split('').sort().join('') === possibleWires['3'].join('') ) {
        continue;
      }
      let codeArray = code.split('');
      for (let v of possibleWires['6']) {
        if (!codeArray.includes(v)) {
          codeArray.push(v);
        }
      }
      if (codeArray.sort().join('') === 'abcdefg') {
        possibleWires['2'] = code.split('').sort();
      } else {
        possibleWires['5'] = code.split('').sort();
      }
    }
  }
  return collapseMappings(possibleWires);
};

let countOneFourSevenEight = (arr) => {
  let count = 0;
  arr.forEach(display => {
    display[1].forEach(outputDigit => {
      if ([4, 2, 3, 7].includes(outputDigit.length)) {
        count++;
      }
    });
  });
  return count;
}

let determineOutputValue = (inputLineArr) => {
  let map = determineDigitWireMapping(inputLineArr[0]);
  let result = [];
  inputLineArr[1].forEach(ele => {
    result.push(map[ele.split('').sort().join('')]);
  });
  return Number(result.join(''));
}
/* Doesn't work anymore as I reversed collapseMappings
console.log(`Part 1 - ${countOneFourSevenEight(input)}`);
*/

let sum = input.reduce((sum, ele) => {
  return sum + determineOutputValue(ele);
}, 0);

console.log(sum);
