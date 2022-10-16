const { readInput, findMinRiskPath } = require("./day15");

test("sample 1", () => {
  let input = readInput("sample1");
  const result = findMinRiskPath(input);
  expect(result).toBe(40);
});

test("problem 1", () => {
  let input = readInput("part1");
  const result = findMinRiskPath(input);
  expect(result).toBe(40);
});
