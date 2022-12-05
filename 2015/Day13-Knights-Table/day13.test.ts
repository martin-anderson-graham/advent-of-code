import { findBest, parseInput, score } from "./day13";
import { sample, input } from "./input";

test("sample", () => {
  let p1 = parseInput(sample);
  let s1 = score(["David", "Alice", "Bob", "Carol"], p1);
  expect(s1).toBe(330);
  expect(findBest(sample)).toBe(330);
});

test("part1", () => {
  expect(findBest(input)).toBe(709);
});

test("part2", () => {
  expect(findBest(input, true)).toBe(668);
});
