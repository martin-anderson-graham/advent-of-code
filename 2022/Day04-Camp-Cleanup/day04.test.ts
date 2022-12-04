import { sample, input } from "./input";
import { parseInput, countOverlapping, countPartialOverlapping } from "./day04";

test("sample", () => {
  let i1 = parseInput(sample);
  let result = countOverlapping(i1);
  expect(result).toBe(2);
});

test("part1", () => {
  let i1 = parseInput(input);
  let result = countOverlapping(i1);
  expect(result).toBe(413);
});

test("sample2", () => {
  let i1 = parseInput(sample);
  let result = countPartialOverlapping(i1);
  expect(result).toBe(4);
});

test("part2", () => {
  let i1 = parseInput(input);
  let result = countPartialOverlapping(i1);
  expect(result).toBe(806);
});
