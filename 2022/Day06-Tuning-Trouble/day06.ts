const isSOF = (str: string): boolean => {
  let one = str.charAt(0);
  let two = str.charAt(1);
  let three = str.charAt(2);
  let four = str.charAt(3);
  return (
    one !== two &&
    one !== three &&
    one !== four &&
    two !== three &&
    two !== four &&
    three !== four
  );
};

const isPacket = (str: string): boolean => {
  let hash: Record<string, number> = {};
  for (let i = 0; i < str.length; i += 1) {
    if (hash[str[i]]) {
      return false;
    }
    hash[str[i]] = 1;
  }
  return true;
};

const part1 = (str: string): number => {
  for (let i = 0; i < str.length - 4; i++) {
    if (isSOF(str.slice(i, i + 4))) {
      return i + 4;
    }
  }
  return -1;
};

const part2 = (str: string): number => {
  for (let i = 0; i < str.length - 14; i++) {
    if (isPacket(str.slice(i, i + 14))) {
      return i + 14;
    }
  }
  return -1;
};

export { part1, part2 };
