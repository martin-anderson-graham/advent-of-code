const parseInput = (str: string): string[] => {
  return str.split("\n");
};

const parseInput2 = (str: string): string[][] => {
  let list = str.split("\n");
  let result: string[][] = [];
  for (let i = 0; i < list.length; i += 1) {
    if (i % 3 === 0) {
      result.push([]);
    }
    result[result.length - 1].push(list[i]);
  }
  return result;
};

const letterValue = (letter: string): number => {
  if (letter.match(/[a-z]/)) {
    return letter.charCodeAt(0) - "a".charCodeAt(0) + 1;
  } else if (letter.match(/[A-Z]/)) {
    return letter.charCodeAt(0) - "A".charCodeAt(0) + 27;
  } else {
    throw new Error("Invalid letter");
  }
};

const findDuplicate = (str: string): string => {
  let mid = Math.floor(str.length / 2);
  let firstHash = str
    .slice(0, mid)
    .split("")
    .reduce((obj: Record<string, boolean>, l) => {
      obj[l] = true;
      return obj;
    }, {});
  let second = str.slice(mid);
  for (let i = 0; i < second.length; i += 1) {
    if (firstHash[second[i]]) {
      return second[i];
    }
  }
  throw new Error("No duplicate found");
};

const sumDoubleItems = (ruckArr: string[]): number => {
  return ruckArr.reduce((sum: number, sack) => {
    let letter = findDuplicate(sack);
    return sum + letterValue(letter);
  }, 0);
};

const findBadges = (arr: string[]): string => {
  let first = arr[0]
    .split("")
    .reduce((obj: Record<string, boolean>, letter) => {
      obj[letter] = true;
      return obj;
    }, {});
  let second = arr[1]
    .split("")
    .reduce((obj: Record<string, boolean>, letter) => {
      obj[letter] = true;
      return obj;
    }, {});
  let third = arr[2].split("");
  for (let i = 0; i < third.length; i += 1) {
    let l = third[i];
    if (first[l] && second[l]) {
      return l;
    }
  }
  throw new Error("No badge found");
};

const sumBadges = (ruckArr: string[][]): number => {
  return ruckArr.reduce((sum: number, group) => {
    return sum + letterValue(findBadges(group));
  }, 0);
};

export {
  sumDoubleItems,
  parseInput,
  letterValue,
  findDuplicate,
  parseInput2,
  findBadges,
  sumBadges,
};
