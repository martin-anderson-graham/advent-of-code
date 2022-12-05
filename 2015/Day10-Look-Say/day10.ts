const lookSayUnit = (str: string): string => {
  return String(str.length) + String(str.charAt(0));
};

const lookSay = (str: string): string => {
  let i = 0;
  let j = 0;
  let result = "";
  while (i < str.length) {
    let l = str.charAt(i);
    while (str.charAt(j) === l) {
      j += 1;
    }
    result += lookSayUnit(str.slice(i, j));
    i = j;
  }
  return result;
};

const part1 = (str: string, depth: number): string => {
  if (depth === 0) {
    return str;
  }
  let res = part1(str, depth - 1);
  return lookSay(res);
};

export { lookSay, part1 };
