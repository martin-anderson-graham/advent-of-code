const arrayize = str => {
  return str.split('').map(ele => {
    if (Number.isInteger(Number(ele))) {
      return Number(ele)
    }
    return ele
  });
}

const unarrayize = arr => {
  return JSON.parse(arr)
}

const add = (str1, str2) => {
  return `[${str1},${str2}]`
}

const addLineArrs = (arr1, arr2) => {
  return ['[', ...arr1, ',', ...arr2, ']']
}

const explode = (lineArr) => {
  let depthCount = 0;
  for (let i = 0; i < lineArr.length; i++) {
    let char = lineArr[i]
    if (char === '[') depthCount += 1
    if (char === ']') depthCount -= 1
    if (depthCount === 5) {
      let firstNum = Number(lineArr[i + 1])
      let secondNumber = Number(lineArr[i + 3])

      let closingIndex = i
      for (let c = i; c < lineArr.length; c++) {
        closingIndex = c;
        if (lineArr[c] === ']') break
      };

      let firstHalf = lineArr.slice(0, i)
      let secondHalf = lineArr.slice(closingIndex + 1)

      for (let j = 0; j < secondHalf.length; j++) {
        if (Number.isInteger(Number(secondHalf[j]))) {
          secondHalf[j] += secondNumber
          break
        };
      };

      for (let j = firstHalf.length - 1; j > 0; j--) {
        if (Number.isInteger(Number(firstHalf[j]))) {
          firstHalf[j] += firstNum
          break
        };
      };

      return [true, [...firstHalf, 0, ...secondHalf]]
    };
  };
  return [false, lineArr]
};

const split = (lineArr) => {
  let changed = false
  for (let i = 0; i < lineArr.length; i++) {
    if (Number(lineArr[i]) && Number(lineArr[i]) > 9) {
      changed = true
      let num = Number(lineArr[i])
      let first = Math.floor(num / 2)
      let second = Math.ceil(num / 2)
      lineArr = [...lineArr.slice(0, i), '[', first, ',', second, ']', ...lineArr.slice(i + 1)]
      break
    };
  };
  return [changed, lineArr]
};

const reduce = (lineArr) => {
  let changed = true;
  while (changed) {
    changed = false
    let [didExplode, newLineArr] = explode(lineArr)
    if (didExplode) {
      changed = true;
      lineArr = newLineArr
    } else {
      let [didSplit, snewLineArr] = split(lineArr)
      if (didSplit) {
        changed = true
        lineArr = snewLineArr
      };
    }
  };
  return lineArr
};

const totalSum = (inputString) => {
  const strArr = inputString.split('\n');
  const lineArrs = strArr.map(ele => arrayize(ele))
  let sum = lineArrs[0]
  for (let i = 1; i < lineArrs.length; i++) {
    sum = reduce(addLineArrs(sum, lineArrs[i]))
  };
  return sum
}

const magnitude = (arr) => {
  if (!Array.isArray(arr)) {
    return arr
  }
  return 3 * magnitude(arr[0]) + 2 * magnitude(arr[1])
}

const part1 = (inputString) => {
  const arrSum = totalSum(inputString)
  return magnitude(unarrayize(arrSum.join('')))
};

const part2 = (inputString) => {
  const strArr = inputString.split('\n');
  const lineArrs = strArr.map(ele => arrayize(ele))
  let maxSum = -Infinity
  for (let i = 0; i < lineArrs.length; i++) {
    for (let j = 0; j < lineArrs.length; j++) {
      if (i === j) continue
      let sum = part1(lineArrs[i].join('') + '\n' + lineArrs[j].join(''))
      if (sum > maxSum) {
        maxSum = sum
      };
    };
  };
  return maxSum
}
module.exports = {
  arrayize,
  unarrayize,
  add,
  explode,
  split,
  reduce,
  totalSum,
  magnitude,
  part1,
  part2,
}
