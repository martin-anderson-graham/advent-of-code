import { sample, input } from "./input";
import { parseInput, findMinimumEnergy } from "./day12";

test("sample", () => {
  let i = parseInput(sample);
  let res = findMinimumEnergy(i);
  expect(res).toBe(31);
});

test("part1", () => {
  let i = parseInput(input);
  let res = findMinimumEnergy(i);
  expect(res).toBe(420);
});

test("sample2", () => {
  let i = parseInput(sample);
  let res = findMinimumEnergy(i, false);
  expect(res).toBe(29);
});

test("part2", () => {
  let i = parseInput(input);
  let res = findMinimumEnergy(i, false);
  expect(res).toBe(414);
});
