const { input1a, input1b } = require("./inputs.js");
const { countOverlapping } = require("./utils.js");
const { countBeacons } = require("./day19.js");

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

test("part 1a", () => {
  let result = countBeacons(input1a);
  expect(result).toBe(79);
});

// test("part 1 solution", () => {
//   let result = countBeacons(input1b);
//   expect(result).toBe(79);
// });
