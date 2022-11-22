const add = (str1, str2) => {
  return `[${str1},${str2}]`
}

const explode = (str, depth) => {
  let depthCount = 0;
  for (let i = 0; i < str.length; i++) {
    let char = str.charAt(i)
    if (char === '[') depthCount += 1
    if (char === ']') depthCount -= 1
    if (depthCount === 5) {
      let firstNum = Number(str.charAt(i + 1))
      let secondNumber = Number(str.charAt(i + 3))

      let closingIndex = i
      for (let c = i; c < str.length; c++) {
        closingIndex = c;
        if (str.charAt(c) === ']') break
      };

      let firstHalf = str.slice(0, i)
      let secondHalf = str.slice(closingIndex + 1)

      for (let j = 0; j < secondHalf.length; j++) {
        if (Number(secondHalf.charAt(j))) {
          secondHalf = secondHalf.slice(0, j) + String(Number(secondHalf.charAt(j)) + secondNumber) + secondHalf.slice(j + 1)
          break
        };
      };

      for (let j = firstHalf.length - 1; j > 0; j--) {
        if (Number(firstHalf.charAt(j))) {
          firstHalf = firstHalf.slice(0, j) + String(Number(firstHalf.charAt(j)) + firstNum) + firstHalf.slice(j + 1)
          break
        };
      };


      return [true, firstHalf + '0' + secondHalf]
    };
  };
  return [false, str]
};


module.exports = {
  explode,
  add
}
