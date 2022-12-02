import md5 from "md5";

const isValid1 = (str: string): boolean => {
  return str.slice(0, 5) === "00000";
};

const isValid2 = (str: string): boolean => {
  return str.slice(0, 6) === "000000";
};

const part1 = (str: string): number => {
  let i = 0;
  while (true) {
    let temp = String(i);
    if (isValid1(md5(str + temp))) {
      return i;
    }
    i += 1;
  }
};

const part2 = (str: string): number => {
  let i = 0;
  while (true) {
    let temp = String(i);
    if (isValid2(md5(str + temp))) {
      return i;
    }
    i += 1;
  }
};

export { part1, part2, isValid1 };
