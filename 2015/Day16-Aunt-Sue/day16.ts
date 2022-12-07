type Aunt = {
  number?: number;
  children?: number;
  cats?: number;
  samoyeds?: number;
  pomeranians?: number;
  akitas?: number;
  vizslas?: number;
  goldfish?: number;
  trees?: number;
  cars?: number;
  perfumes?: number;
};

const isValid1 = (aunt: Aunt, key: Aunt): boolean => {
  let props = Object.entries(aunt);
  for (let i = 0; i < props.length; i += 1) {
    let [prop, val] = props[i];
    if (prop === "number") {
      continue;
    }
    if (key[prop] !== undefined) {
      if (key[prop] !== val) {
        return false;
      }
    } else if (key[prop] === undefined) {
      return false;
    }
  }
  return true;
};

const part1 = (k: string, input: string): number => {
  const key: Aunt = k.split("\n").reduce((aunt: Aunt, row: string): Aunt => {
    let arr = row.replace(":", "").split(" ");
    aunt[arr[0]] = Number(arr[1]);
    return aunt;
  }, {} as Aunt);

  const aunts: Aunt[] = input
    .replace(new RegExp(":", "g"), "")
    .replace(new RegExp(",", "g"), "")
    .split("\n")
    .map((row) => {
      let arr = row.split(" ");
      let res: Aunt = {
        number: Number(arr[1]),
      };
      for (let i = 2; i < arr.length; i += 2) {
        res[arr[i]] = Number(arr[i + 1]);
      }
      return res;
    });

  for (let i = 0; i < aunts.length; i += 1) {
    let aunt = aunts[i];
    if (isValid1(aunt, key)) {
      return aunt.number;
    }
  }
  return -1;
};

const isValid2 = (aunt: Aunt, key: Aunt): boolean => {
  let props = Object.entries(aunt);
  for (let i = 0; i < props.length; i += 1) {
    let [prop, val] = props[i];
    if (prop === "number") {
      continue;
    }
    if (key[prop] !== undefined) {
      if (prop === "cats" || prop === "trees") {
        if (key[prop] >= val) {
          return false;
        }
      } else if (prop === "pomeranians" || prop === "goldfish") {
        if (key[prop] <= val) {
          return false;
        }
      } else {
        if (key[prop] !== val) {
          return false;
        }
      }
    } else if (key[prop] === undefined) {
      return false;
    }
  }
  return true;
};

const part2 = (k: string, input: string): number => {
  const key: Aunt = k.split("\n").reduce((aunt: Aunt, row: string): Aunt => {
    let arr = row.replace(":", "").split(" ");
    aunt[arr[0]] = Number(arr[1]);
    return aunt;
  }, {} as Aunt);

  const aunts: Aunt[] = input
    .replace(new RegExp(":", "g"), "")
    .replace(new RegExp(",", "g"), "")
    .split("\n")
    .map((row) => {
      let arr = row.split(" ");
      let res: Aunt = {
        number: Number(arr[1]),
      };
      for (let i = 2; i < arr.length; i += 2) {
        res[arr[i]] = Number(arr[i + 1]);
      }
      return res;
    });

  for (let i = 0; i < aunts.length; i += 1) {
    let aunt = aunts[i];
    if (isValid2(aunt, key)) {
      return aunt.number;
    }
  }
  return -1;
};
export { part1, part2 };
