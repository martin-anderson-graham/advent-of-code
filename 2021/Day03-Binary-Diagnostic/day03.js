var fs = require('fs');
var path = require('path');

var input = fs.readFileSync(path.resolve(__dirname, './input.txt')).toString().split(/\r?\n/);

let determineMostCommontDigit = (arr, index) => {
  let digitCount = [0, 0];
  for (let idx = 0; idx < arr.length; idx++) {
    if (arr[idx][index] === '1') {
      digitCount[1]++;
    } else {
      digitCount[0]++;
    }
  }
  if (digitCount[0] > digitCount[1]) {
    return '0';
  } else  if (digitCount[1] > digitCount[0]) {
    return '1';
  } else {
    return '-1';
  }
}

let determineLeastCommontDigit = (arr, index) => {
  let digitCount = [0, 0];
  for (let idx = 0; idx < arr.length; idx++) {
    if (arr[idx][index] === '1') {
      digitCount[1]++;
    } else {
      digitCount[0]++;
    }
  }
  if (digitCount[0] > digitCount[1]) {
    return '1';
  } else  if (digitCount[1] > digitCount[0]) {
    return '0';
  } else {
    return '-1';
  }
}

let decimalFromBinary = ( binaryString) => {
  let result = 0;
  let power = 0;
  let digitArray = binaryString.split('');
  while( digitArray.length) {
    let digit = digitArray.pop();
    if (digit === '1') {
      result += Math.pow(2, power);
    }
    power++;
  }
  return result;
};

let determineGammaAndEpsilonRate = (arr) => {
  let digitCountArray = [];
  for (let idx = 0; idx < arr[0].length; idx++) {
    digitCountArray.push([0, 0]);
  }
  arr.forEach( element => {
    for(let idx = 0; idx < element.length; idx++) {
      if(element[idx] === '1') {
        digitCountArray[idx][1]++;
      } else {
        digitCountArray[idx][0]++;
      }
    }
  })
  let gamma = '';
  let epsilon = '';
  digitCountArray.forEach( digitArray => {
    if(digitArray[0] > digitArray[1]) {
      gamma += '0';
      epsilon += '1';
    } else {
      gamma += '1';
      epsilon += '0';
    }
  })
  return [decimalFromBinary(gamma), decimalFromBinary(epsilon)];
};

let determineOorCO2Ratings = (arr, code) => {
  let list = arr.slice();
  let currentIndex = 0;
  while(true) {
    if (list.length === 1) {
      return decimalFromBinary(list[0]);
    }
    if (code === '1') {
      let mostCommonDigit = determineMostCommontDigit(list, currentIndex);
      list = list.filter( element => {
        if (mostCommonDigit !== '-1') {
          return element[currentIndex] === mostCommonDigit;
        } else {
          return element[currentIndex] === code;
        }
      });
    } else if (code === '0') {
      let leastCommonDigit = determineLeastCommontDigit(list, currentIndex);
      list = list.filter( element => { 
        if (leastCommonDigit !== '-1') {
          return element[currentIndex] === leastCommonDigit;
        } else {
          return element[currentIndex] === code;
        }
      });
    }
    currentIndex++;
  }
};

let [gammaRate, epislonRate] = determineGammaAndEpsilonRate(input);

let [oxygenRating, co2Rating] = [determineOorCO2Ratings(input, '1'), determineOorCO2Ratings(input, '0')];


console.log(`Power rating is - ${gammaRate * epislonRate}`);
console.log(`Life support rating - ${oxygenRating * co2Rating} `)