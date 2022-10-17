const { readInput, findMinRiskPath, partTwoInput } = require("./day15");

test("sample 1", () => {
  let input = readInput("sample1");
  const result = findMinRiskPath(input);
  expect(result).toBe(40);
});

test("problem 1", () => {
  let input = readInput("part1");
  const result = findMinRiskPath(input);
  expect(result).toBe(458);
});

test("sample 2", () => {
  let input = readInput("sample1");
  input = partTwoInput(input);
  const result = findMinRiskPath(input);
  expect(result).toBe(315);
});

test("problem 2", () => {
  let input = readInput("part1");
  input = partTwoInput(input);
  const result = findMinRiskPath(input);
  expect(result).toBe(2800);
});
