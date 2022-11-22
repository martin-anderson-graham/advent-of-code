let {
  sample1Algo,
  sample1Image,
  puzzleAlgo,
  puzzleInput,
} = require('./input')
let {
  pixelToDecimal,
  lookupFromAlgo,
  getStringOfLocalPixels,
  parseInputIntoArr,
  processImage,
  countPixels,
} = require('./day20')

test("pixelToDecimal", () => {
  let str = '...#...#.'
  let result = pixelToDecimal(str)
  expect(result).toBe(34)
})

test("lookupFromAlgo", () => {
  let algo = sample1Algo
  expect(lookupFromAlgo(algo, 34)).toBe('#')
  expect(lookupFromAlgo(algo, 20)).toBe('#')
  expect(lookupFromAlgo(algo, 60)).toBe('.')
});

test("getStringOfLocalPixels", () => {
  let inputStr = sample1Image
  let inputArr = parseInputIntoArr(inputStr)
  let pixelString = getStringOfLocalPixels(inputArr, 2, 2, '.')
  expect(pixelString).toBe('...#...#.')

  let cornerString = getStringOfLocalPixels(inputArr, 0, 0, '.')
  expect(cornerString).toBe('....#..#.')

  let botString = getStringOfLocalPixels(inputArr, 4, 2, '.')
  expect(botString).toBe('.#..##...')
});

test("processImage - visual check", () => {
  let inputStr = sample1Image
  let inputArr = parseInputIntoArr(inputStr)
  let algo = sample1Algo
  let img = processImage(inputArr, algo)
  // console.log(img.map(r => r.join('')).join('\n'))
  expect(true).toBe(true)
});

test("countPixels", () => {
  let inputStr = sample1Image
  let inputArr = parseInputIntoArr(inputStr)
  let algo = sample1Algo
  let img = inputArr
  for (let i = 0; i < 2; i++) {
    img = processImage(img, algo, '.')
  };
  // console.log(img.map(r => r.join('')).join('\n'))
  expect(countPixels(img)).toBe(35)
});

test("part1", () => {
  let inputStr = puzzleInput
  let inputArr = parseInputIntoArr(inputStr)
  let algo = puzzleAlgo
  let img = processImage(inputArr, algo, '.')
  img = processImage(img, algo, '#')
  // console.log(img.map(r => r.join('')).join('\n'))
  expect(countPixels(img)).toBe(5884)
})

test("part2", () => {
  let inputStr = sample1Image
  let inputArr = parseInputIntoArr(inputStr)
  let algo = sample1Algo
  let img = inputArr
  for (let i = 0; i < 50; i++) {
    img = processImage(img, algo, '.')
  };
  // console.log(img.map(r => r.join('')).join('\n'))
  expect(countPixels(img)).toBe(3351)

  let inputStr2 = puzzleInput
  let inputArr2 = parseInputIntoArr(inputStr2)
  let algo2 = puzzleAlgo
  let img2 = inputArr2
  let padSymbol = '.'
  for (let i = 0; i < 50; i++) {
    img2 = processImage(img2, algo2, padSymbol)
    if (padSymbol === '.') {
      padSymbol = '#'
    } else {
      padSymbol = '.'
    };
  };
  expect(countPixels(img2)).toBe(19043)
})
