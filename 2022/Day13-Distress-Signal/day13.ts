const parseInput = (str: string): any[] => {
  return str.split("\n\n").map((pair) => {
    return pair.split("\n").map((row) => JSON.parse(row));
  });
};

const isValidOrder = (a: any, b: any): boolean[] => {
  if (Number.isInteger(a) && Number.isInteger(b)) {
    if (a < b) {
      return [true, false];
    }
    if (a === b) {
      return [false, true];
    } else {
      return [false, false];
    }
  } else if (Array.isArray(a) && Array.isArray(b)) {
    for (let i = 0; i < a.length; i++) {
      if (b[i] === undefined) {
        return [false, false];
      }
      let valid = isValidOrder(a[i], b[i]);
      if (valid[1]) {
        continue;
      } else {
        return [valid[0], false];
      }
    }
    if (a.length === b.length) {
      return [true, true];
    } else {
      return [true, false];
    }
  } else {
    if (Array.isArray(a) && Number.isInteger(b)) {
      let newB = [b];
      return isValidOrder(a, newB);
    } else if (Array.isArray(b) && Number.isInteger(a)) {
      let newA = [a];
      return isValidOrder(newA, b);
    }
  }
};

const countValidPairs = (pairs: any[]): number => {
  let validIndices: number[] = [];
  pairs.forEach((pair, idx) => {
    let [valid, _] = isValidOrder(pair[0], pair[1]);
    if (valid) {
      validIndices.push(idx);
    }
  });

  return validIndices.reduce((sum, ele) => sum + ele + 1, 0);
};

const sortPackets = (pairs: any[]): number => {
  let decoder1 = [[2]];
  let decoder2 = [[6]];
  let packets = [];
  pairs.forEach((pair) => {
    pair.forEach((p) => packets.push(p));
  });
  packets.push(decoder1);
  packets.push(decoder2);

  packets.sort((a, b) => {
    if (isValidOrder(a, b)[0]) {
      return -1;
    } else {
      return 1;
    }
  });

  let i1 = packets.indexOf(decoder1) + 1;
  let i2 = packets.indexOf(decoder2) + 1;
  // console.log(packets.map((r) => JSON.stringify(r)).join("\n"));
  return i1 * i2;
};

export { parseInput, countValidPairs, sortPackets };
