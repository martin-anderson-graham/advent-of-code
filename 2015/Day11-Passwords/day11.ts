const hasStraight = (str: string): boolean => {
  for (let i = 0; i < str.length - 2; i += 1) {
    const one = str.charCodeAt(i);
    const two = str.charCodeAt(i + 1);
    const three = str.charCodeAt(i + 2);

    if (two === one + 1 && three === two + 1) {
      return true;
    }
  }
  return false;
};

let ilo = new RegExp("[ilo]");

const hasTwoPairs = (str: string): boolean => {
  let count = 0;
  for (let i = 0; i < str.length - 1; i++) {
    if (str.charAt(i) === str.charAt(i + 1)) {
      count += 1;
      i += 1;
    }
  }
  return count > 1;
};

const isValid = (str: string): boolean => {
  return hasStraight(str) && !str.match(ilo) && hasTwoPairs(str);
};

const nextLetter = (str: string): string => {
  return String.fromCharCode(str.charCodeAt(0) + 1);
};

const incrementString = (str: string): string => {
  let newString = str.slice(0, -1) + nextLetter(str.charAt(str.length - 1));

  for (let i = newString.length - 1; i > 0; i -= 1) {
    if (newString.charAt(i) > "z".charAt(0)) {
      newString =
        newString.slice(0, i - 1) +
        nextLetter(str.charAt(i - 1)) +
        "a" +
        newString.slice(i + 1);
    }
  }
  return newString;
};

const findNextPassword = (str: string): string => {
  let test = incrementString(str);
  while (!isValid(test)) {
    // console.log(test);
    test = incrementString(test);
  }
  // console.log(test);
  return test;
};

export { isValid, incrementString, findNextPassword, hasTwoPairs };
