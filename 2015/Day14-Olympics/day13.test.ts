import { input, sample } from "./input";
import { parseInput, race, race2 } from "./day13";

test("sample", () => {
  expect(race(sample, 1000)).toBe(1120);
});

test("part1", () => {
  expect(race(input, 2503)).toBe(2655);
});

test("sample2", () => {
  expect(race2(sample, 1000)).toBe(689);
});

test("part2", () => {
  expect(race2(input, 2503)).toBe(1059);
});
