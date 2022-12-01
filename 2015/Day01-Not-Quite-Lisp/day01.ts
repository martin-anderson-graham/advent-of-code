const process = (str: string): number => {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === "(") {
      result += 1;
    } else {
      result -= 1;
    }
  }

  return result;
};

const part2 = (str: string): number => {
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === "(") {
      result += 1;
    } else {
      result -= 1;
    }
    if (result === -1) {
      return i + 1;
    }
  }

  return result;
};

export { process, part2 };
