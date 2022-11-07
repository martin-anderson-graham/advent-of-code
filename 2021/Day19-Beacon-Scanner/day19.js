const {
  printOverlapping,
  parseInput,
  produceRotation,
  countOverlapping,
  generateDiffArrayFromPoint,
} = require("./utils.js");

const BEACON_LIMIT = 12;

const findMatchingRotation = (rotationsArr, knownCorrectArr) => {
  for (let rotArrIdx = 0; rotArrIdx < rotationsArr.length; rotArrIdx++) {
    for (
      let rotPointIdx = 0;
      rotPointIdx < rotationsArr[rotArrIdx].length;
      rotPointIdx++
    ) {
      for (let bIdx = 0; bIdx < knownCorrectArr.length; bIdx++) {
        let diffArr = generateDiffArrayFromPoint(
          knownCorrectArr,
          bIdx,
          rotationsArr[rotArrIdx],
          rotArrIdx
        );
        let count = countOverlapping(diffArr, knownCorrectArr);
        if (count >= BEACON_LIMIT) {
          // printOverlapping(diffArr, knownCorrectArr);
          return diffArr;
        }
      }
    }
  }
  return -1;
};

const findNumUniquesInGoodArrays = (goodArrays) => {
  const uniques = {};
  goodArrays.forEach((arr) => {
    arr.forEach((row) => {
      uniques[row.toString()] = true;
    });
  });
  const arr = [];
  Object.keys(uniques).forEach((val) => arr.push(val));
  arr.sort((a, b) => {
    let num1 = Number(a.split(",")[0]);
    let num2 = Number(b.split(",")[0]);
    return num1 - num2;
  });
  console.log(arr.join("\n"));
  return Object.keys(uniques).length;
};

const printArray = (arr) => {
  console.log(arr.join("\n") + "\n")
};

const countBeacons = (inputString) => {
  let sensorArray = parseInput(inputString);
  let goodArrays = [sensorArray[0].slice()];
  let usedArrays = new Array(sensorArray.length).fill(false);
  usedArrays[0] = true;
  while (usedArrays.some((val) => val !== true)) {
    for (let i = 0; i < sensorArray.length; i++) {
      if (usedArrays[i]) {
        continue;
      }
      let b2 = produceRotation(sensorArray[i]);
      for (let j = 0; j < goodArrays.length; j++) {
        const matchingArr = findMatchingRotation(b2, sensorArray[j]);
        if (matchingArr === -1) {
          continue;
        } else {
          console.log(`scanner-${i}`)
          printArray(matchingArr)
          usedArrays[i] = true;
          goodArrays.push(matchingArr);
          break;
        }
      }
    }
  }
  return findNumUniquesInGoodArrays(goodArrays);
};
module.exports = {countBeacons};
