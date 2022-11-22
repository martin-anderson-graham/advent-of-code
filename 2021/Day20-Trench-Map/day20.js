const parseInputIntoArr = (inputString) => {
  return inputString.split('\n').map(row => row.split(''))
};

const pixelToDecimal = (str) => {
  let binaryStr = str.split('').map(ele => {
    if (ele === '.') return '0'
    if (ele === '#') return '1'
  }).join('')
  return parseInt(binaryStr, 2)
};

const lookupFromAlgo = (algo, num) => {
  return algo.charAt(num)
}

const getStringOfLocalPixels = (pixelArr, x, y, padSymbol) => {
  let topLeft = pixelArr[x - 1]?.[y - 1] || padSymbol
  let topMiddle = pixelArr[x - 1]?.[y] || padSymbol
  let topRight = pixelArr[x - 1]?.[y + 1] || padSymbol
  let middleLeft = pixelArr[x]?.[y - 1] || padSymbol
  let middleMiddle = pixelArr[x]?.[y] || padSymbol
  let middleRight = pixelArr[x]?.[y + 1] || padSymbol
  let botLeft = pixelArr[x + 1]?.[y - 1] || padSymbol
  let botMiddle = pixelArr[x + 1]?.[y] || padSymbol
  let botRight = pixelArr[x + 1]?.[y + 1] || padSymbol

  return topLeft + topMiddle + topRight + middleLeft + middleMiddle + middleRight + botLeft + botMiddle + botRight
};

const padImage = (pixelArr, algo, padSymbol) => {
  pixelArr.unshift(new Array(pixelArr[0].length + 2).fill(padSymbol))
  for (let i = 1; i < pixelArr.length; i++) {
    pixelArr[i].unshift(padSymbol);
    pixelArr[i].push(padSymbol)
  };
  pixelArr.push(new Array(pixelArr[0].length).fill(padSymbol))
}

const processImage = (pixelArr, algo, padSymbol) => {
  padImage(pixelArr, algo, padSymbol)
  let result = []
  for (let r = 0; r < pixelArr.length; r++) {
    result.push([])
    for (let c = 0; c < pixelArr[r].length; c++) {
      let localString = getStringOfLocalPixels(pixelArr, r, c, padSymbol)
      let num = pixelToDecimal(localString)
      result[r].push(lookupFromAlgo(algo, num))
    };
  };
  return result
}

const countPixels = (inputArr) => {
  let count = 0
  inputArr.forEach(row => {
    row.forEach(ele => {
      if (ele === '#') {
        count++
      };
    })
  })
  return count
};

module.exports = {
  parseInputIntoArr,
  pixelToDecimal,
  lookupFromAlgo,
  getStringOfLocalPixels,
  padImage,
  processImage,
  countPixels,
};
