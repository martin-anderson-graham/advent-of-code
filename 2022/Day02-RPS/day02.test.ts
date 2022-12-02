import { sample1, input } from "./input";
import { parseInput, scoreGame, totalScore } from "./day02";

test("sample1", () => {
  const i1 = parseInput(sample1);
  let result = totalScore(i1);
  expect(result).toBe(15);
});

test("part1", () => {
  const i1 = parseInput(input);
  let result = totalScore(i1);
  expect(result).toBe(11475);
});

test("sample2", () => {
  const i1 = parseInput(sample1);
  let result = totalScore(i1, 2);
  expect(result).toBe(12);
});

test("part2", () => {
  const i1 = parseInput(input);
  let result = totalScore(i1, 2);
  expect(result).toBe(16862);
});
