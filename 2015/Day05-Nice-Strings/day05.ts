const isNice = (str: string): boolean => {
  let threeVowels = new RegExp("[aeiou]", "g");
  let repeat = new RegExp("([a-z])\\1");
  let combos = new RegExp("ab|cd|pq|xy");
  return (
    str.match(threeVowels)?.length > 2 &&
    !!str.match(repeat) &&
    !str.match(combos)
  );
};

const newNice = (str: string): boolean => {
  let repeatPair = new RegExp("([a-z][a-z]).*(\\1)");
  let repeatWithBetween = new RegExp("([a-z])[a-z](\\1)");
  return !!str.match(repeatWithBetween) && !!str.match(repeatPair);
};

const countNice = (input: string): number => {
  return input.split("\n").filter(isNice).length;
};

const countNewNice = (input: string): number => {
  return input.split("\n").filter(newNice).length;
};

export { countNice, isNice, newNice, countNewNice };
