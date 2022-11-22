const {
  printOverlapping,
  parseInput,
  produceRotation,
  countOverlapping,
  generateDiffArrayFromPoint,
  findMatchingRotation,
} = require("./utils.js");

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
  // console.log(arr.join("\n"));
  return Object.keys(uniques).length;
};

const printArray = (arr) => {
  console.log(arr.join("\n") + "\n");
};

const countBeacons = (sensorArray) => {
  let goodArrays = [sensorArray[0].slice()];
  let usedArrays = new Array(sensorArray.length).fill(false);
  let rightBeacons = [];
  sensorArray[0].forEach((arr) => rightBeacons.push(arr));
  usedArrays[0] = true;
  let changes = [];
  let rotatedArrays = sensorArray.map((arr) => produceRotation(arr));
  while (usedArrays.some((val) => val !== true)) {
    // while (usedArrays.filter((val) => val !== true).length !== 1) {
    // console.log(usedArrays);
    for (let i = 0; i < sensorArray.length; i++) {
      if (usedArrays[i]) {
        continue;
      }
      const [change, matchingArr] = findMatchingRotation(
        rotatedArrays[i],
        // goodArrays[j]
        rightBeacons
      );
      if (matchingArr === -1) {
        continue;
      } else {
        changes.push(change)
        usedArrays[i] = true;
        goodArrays.push(matchingArr);
        matchingArr.forEach((arr) => {
          if (
            !rightBeacons.some(
              (point) =>
                point[0] === arr[0] &&
                point[1] === arr[1] &&
                point[2] === arr[2]
            )
          ) {
            rightBeacons.push(arr);
          }
        });
        console.log(
          `number of matched arrays is ${usedArrays.filter((val) => val).length
          }/${sensorArray.length}`
        );
        // printArray(matchingArr);
        // break;
      }
    }
  }
  // printArray(rightBeacons);
  return [rightBeacons.length, changes];
  // return findNumUniquesInGoodArrays(goodArrays);
};

const manhattanDistance = (p1, p2) => {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]) + Math.abs(p1[2] - p2[2])
}

const largestManhattan = (changes) => {
  let max = -Infinity;
  changes.forEach(a => {
    changes.forEach(b => {
      if (manhattanDistance(a, b) > max) {
        max = manhattanDistance(a, b)
      }
    })
  })
  return max
}
module.exports = {largestManhattan, countBeacons, printArray};
