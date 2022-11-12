const { input1a, input1b } = require("./inputs.js");
const {
  sortBeacons,
  findMatchingRotation,
  produceRotation,
  countOverlapping,
  parseInput,
} = require("./utils.js");
const { printArray, countBeacons } = require("./day19.js");

test("countOverlapping test", () => {
  let arr1 = [
    [-618, -824, -621],
    [-537, -823, -458],
    [-447, -329, 318],
    [4, -588, -901],
    [44, -627, -890],
    [28, -643, 409],
    [-661, -816, -575],
    [90, -675, -793],
    [23, -701, 434],
    [-345, -311, 381],
    [59, -707, 401],
    [-485, -357, 347],
  ];
  let arr2 = [
    [-618, -824, -621],
    [-537, -823, -458],
    [-447, -329, 318],
    [4, -588, -901],
    [44, -627, -890],
    [28, -643, 409],
    [-661, -816, -575],
    [90, -675, -793],
    [23, -701, 434],
    [-345, -311, 381],
    [59, -707, 401],
    [-485, -357, 345],
  ];
  let result = countOverlapping(arr1, arr2);
  expect(result).toBe(11);
});

test("produce rotations", () => {
  let testPoint = [[1, 2, 3]];
  // let expected = [
  //   //original
  //   [[1, 2, 3]],
  //   [[-3, 2, 1]],
  //   [[-1, 2, -3]],
  //   [[3, 2, -1]],
  //   //spin180
  //   [[-1, -2, 3]],
  //   [[-3, -2, -1]],
  //   [[1, -2, -3]],
  //   [[3, -2, 1]],
  //   //turnLeft
  //   [[2, -1, 3]],
  //   [[-3, -1, 2]],
  //   [[-2, -1, -3]],
  //   [[3, -1, -2]],
  //   //turnRight
  //   [[-2, 1, 3]],
  //   [[-3, 1, -2]],
  //   [[2, 1, -3]],
  //   [[3, 1, 2]],
  //   //turnUp
  //   [[1, 3, -2]],
  //   [[2, 3, 1]],
  //   [[-1, 3, 2]],
  //   [[-2, 3, -1]],
  //   //turnDown
  //   [[1, -3, 2]],
  //   [[-2, -3, 1]],
  //   [[-1, -3, -2]],
  //   [[2, -3, -1]],
  // ];
  let expected = [
    [[1, 2, 3]],
    [[-3, 2, 1]],
    [[-1, 2, -3]],
    [[3, 2, -1]],

    [[-1, -2, 3]],
    [[-3, -2, -1]],
    [[1, -2, -3]],
    [[3, -2, 1]],

    [[1, 3, -2]],
    [[2, 3, 1]],
    [[-1, 3, 2]],
    [[-2, 3, -1]],

    [[1, -3, 2]],
    [[-2, -3, 1]],
    [[-1, -3, -2]],
    [[2, -3, -1]],

    [[2, -1, 3]],
    [[-3, -1, 2]],
    [[-2, -1, -3]],
    [[3, -1, -2]],

    [[-2, 1, 3]],
    [[-3, 1, -2]],
    [[2, 1, -3]],
    [[3, 1, 2]],
  ];
  let result = produceRotation(testPoint);
  // let str = "";
  // result.forEach((arr) => (str += arr.toString() + "\n"));
  // console.log(str);
  expect(new Set(result)).toEqual(new Set(expected));
});

test("matching 2 with 4", () => {
  let rightBeacons = [
    [404, -588, -901],
    [528, -643, 409],
    [-838, 591, 734],
    [390, -675, -793],
    [-537, -823, -458],
    [-485, -357, 347],
    [-345, -311, 381],
    [-661, -816, -575],
    [-876, 649, 763],
    [-618, -824, -621],
    [553, 345, -567],
    [474, 580, 667],
    [-447, -329, 318],
    [-584, 868, -557],
    [544, -627, -890],
    [564, 392, -477],
    [455, 729, 728],
    [-892, 524, 684],
    [-689, 845, -530],
    [423, -701, 434],
    [7, -33, -71],
    [630, 319, -379],
    [443, 580, 662],
    [-789, 900, -551],
    [459, -707, 401],
    [-27, -1108, -65],
    [408, -1815, 803],
    [-499, -1607, -770],
    [-601, -1648, -643],
    [568, -2007, -577],
    [534, -1912, 768],
    [497, -1838, -617],
    [-635, -1737, 486],
    [396, -1931, -563],
    [-518, -1681, -600],
    [432, -2009, 850],
    [-739, -1745, 668],
    [-687, -1600, 576],
    [-697, -3072, -689],
    [366, -3059, 397],
    [-430, -3130, 366],
    [-620, -3212, 371],
    [-654, -3158, -753],
    [846, -3110, -434],
    [12, -2351, -103],
    [-470, -3283, 303],
    [686, -3108, -505],
    [346, -2985, 342],
    [377, -2827, 367],
    [776, -3184, -501],
    [-706, -3180, -659],
    [-612, -1695, 1788],
    [-631, -672, 1502],
    [612, -1593, 1893],
    [465, -695, 1988],
    [-413, -627, 1469],
    [-456, -621, 1527],
    [-36, -1284, 1171],
    [456, -540, 1869],
    [527, -524, 1933],
    [-532, -1715, 1894],
    [-624, -1620, 1868],
    [496, -1584, 1900],
    [605, -1665, 1952],
    [26, -1119, 1091],
  ];
  let proper4 = [
    [-612, -1695, 1788],
    [534, -1912, 768],
    [-631, -672, 1502],
    [-485, -357, 347],
    [-447, -329, 318],
    [459, -707, 401],
    [612, -1593, 1893],
    [465, -695, 1988],
    [-413, -627, 1469],
    [-456, -621, 1527],
    [-36, -1284, 1171],
    [408, -1815, 803],
    [-739, -1745, 668],
    [432, -2009, 850],
    [456, -540, 1869],
    [-635, -1737, 486],
    [-687, -1600, 576],
    [-345, -311, 381],
    [423, -701, 434],
    [527, -524, 1933],
    [-532, -1715, 1894],
    [-624, -1620, 1868],
    [496, -1584, 1900],
    [605, -1665, 1952],
    [528, -643, 409],
    [26, -1119, 1091],
  ];
  let original2 = [
    [649, 640, 665],
    [682, -795, 504],
    [-784, 533, -524],
    [-644, 584, -595],
    [-588, -843, 648],
    [-30, 6, 44],
    [-674, 560, 763],
    [500, 723, -460],
    [609, 671, -379],
    [-555, -800, 653],
    [-675, -892, -343],
    [697, -426, -610],
    [578, 704, 681],
    [493, 664, -388],
    [-671, -858, 530],
    [-667, 343, 800],
    [571, -461, -707],
    [-138, -166, 112],
    [-889, 563, -600],
    [646, -828, 498],
    [640, 759, 510],
    [-630, 509, 768],
    [-681, -892, -333],
    [673, -379, -804],
    [-742, -814, -386],
    [577, -820, 562],
  ];
  const rotatedArray = produceRotation(original2);
  // sortBeacons(rightBeacons);
  // printArray(rightBeacons);
  const [change, matchingArr] = findMatchingRotation(
    rotatedArray,
    rightBeacons
  );

  console.log("change", change, "matchingArr", matchingArr);
  expect(change).toEqual([1105, -1205, 1229]);
});

test.skip("part 1a", () => {
  let sensorArray = parseInput(input1a);
  let result = countBeacons(sensorArray);
  expect(result).toBe(79);
});

// test("part 1 solution", () => {
// let sensorArray = parseInput(input1a);
//   let result = countBeacons(sensorArray);
//   expect(result).toBe(79);
// });
