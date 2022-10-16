let { recursiveSolve, iterateRules, partOneScore } = require("./day14");

let path = require("path");
let fs = require("fs");

test("test values part 1", () => {
  let inputString = "./input2.txt";
  let input = fs
    .readFileSync(path.resolve(__dirname, inputString))
    .toString()
    .split(/\r?\n/);
  let polymer = input[0];
  let pairs = input.slice(2).map((ele) => ele.split(" -> "));
  let result = recursiveSolve(polymer, pairs, 10);
  expect(result).toBe(1588);
});

test("part one", () => {
  let inputString = "./input.txt";
  let input = fs
    .readFileSync(path.resolve(__dirname, inputString))
    .toString()
    .split(/\r?\n/);
  let polymer = input[0];
  let pairs = input.slice(2).map((ele) => ele.split(" -> "));
  let result = recursiveSolve(polymer, pairs, 10);
  expect(result).toBe(2375);
});

test("part two test", () => {
  let inputString = "./input2.txt";
  let input = fs
    .readFileSync(path.resolve(__dirname, inputString))
    .toString()
    .split(/\r?\n/);
  let polymer = input[0];
  let pairs = input.slice(2).map((ele) => ele.split(" -> "));
  let result = recursiveSolve(polymer, pairs, 40);
  expect(result).toBe(2188189693529);
});

test("part two actual", () => {
  let inputString = "./input.txt";
  let input = fs
    .readFileSync(path.resolve(__dirname, inputString))
    .toString()
    .split(/\r?\n/);
  let polymer = input[0];
  let pairs = input.slice(2).map((ele) => ele.split(" -> "));
  let result = recursiveSolve(polymer, pairs, 40);
  expect(result).toBe(1976896901756);
});
