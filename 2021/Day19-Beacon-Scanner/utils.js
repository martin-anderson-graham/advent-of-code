const parseInput = (inputString) => {
  const lines = inputString.split("\n");
  const result = lines.reduce((acc, line) => {
    if (line.match(/^---.*/)) {
      acc.push([]);
    } else if (line !== "") {
      acc[acc.length - 1].push(
        line
          .split(",")
          .map((ele) => Number(ele))
          .reduce((arr, num) => {
            arr.push(num);
            return arr;
          }, [])
      );
    }
    return acc;
  }, []);

  return result;
};

const printOverlapping = (arr1, arr2) => {
  let hash1 = arr1.reduce((acc, val) => {
    acc[val.toString()] = true;
    return acc;
  }, {});
  let hash2 = arr2.reduce((acc, val) => {
    acc[val.toString()] = true;
    return acc;
  }, {});
  const list = [];
  Object.keys(hash1).forEach((val) => {
    if (hash2[val]) {
      list.push(val);
    }
  });
  console.log(list);
  return;
};

//an array of all 24 possible versions of the single beaconArr
const produceRotation = (beaconArr) => {
  const spinClockwise = (arr) => {
    return [-arr[2], arr[1], arr[0]];
  };

  const spinOneEighty = (arr) => {
    return [-arr[0], -arr[1], arr[2]];
  };

  const turnUp = (arr) => {
    return [arr[0], arr[2], -arr[1]];
  };

  const turnDown = (arr) => {
    return [arr[0], -arr[2], arr[1]];
  };
  const result = [beaconArr.slice()];
  //three clockwise spins from start
  for (let i = 0; i < 3; i++) {
    result.push([]);
    result[result.length - 2].forEach((arr) =>
      result[result.length - 1].push(spinClockwise(arr))
    );
  }
  //now invert start
  result.push(beaconArr.map((arr) => spinOneEighty(arr)));
  //three clockwise spins from there
  for (let i = 0; i < 3; i++) {
    result.push([]);
    result[result.length - 2].forEach((arr) =>
      result[result.length - 1].push(spinClockwise(arr))
    );
  }
  //now turn up from start
  result.push(beaconArr.map((arr) => turnUp(arr)));
  //three clockwise spins from there
  for (let i = 0; i < 3; i++) {
    result.push([]);
    result[result.length - 2].forEach((arr) =>
      result[result.length - 1].push(spinClockwise(arr))
    );
  }

  //now turn down from start
  result.push(beaconArr.map((arr) => turnDown(arr)));
  //three clockwise spins from there
  for (let i = 0; i < 3; i++) {
    result.push([]);
    result[result.length - 2].forEach((arr) =>
      result[result.length - 1].push(spinClockwise(arr))
    );
  }
  return result;
};

const countOverlapping = (arr1, arr2) => {
  let arr1Hash = arr1.reduce((acc, row) => {
    acc[row.toString()] = true;
    return acc;
  }, {});

  let count = 0;
  arr2.forEach((row) => {
    if (arr1Hash[row.toString()]) {
      count += 1;
    }
  });
  return count;
};

const generateDiffArrayFromPoint = (
  beaconArr,
  beaconArrIndex,
  rotArr,
  rotArrIdx
) => {
  const beaconPoint = beaconArr[beaconArrIndex];
  const targetPoint = rotArr[rotArrIdx];
  const change = [
    beaconPoint[0] - targetPoint[0],
    beaconPoint[1] - targetPoint[1],
    beaconPoint[2] - targetPoint[2],
  ];
  const result = rotArr.map((row) => {
    return [row[0] + change[0], row[1] + change[1], row[2] + change[2]];
  });
  return result;
};

module.exports = {
  produceRotation,
  parseInput,
  countOverlapping,
  printOverlapping,
  generateDiffArrayFromPoint,
};
