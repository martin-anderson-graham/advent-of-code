import { part1, parseInput, part2 } from "./day17";
import { sample, input } from "./input";

test("sample", () => {
  let i = parseInput(sample);
  let res = part1(i, 25);
  expect(res).toBe(4);
});

test("part1", () => {
  let i = parseInput(input);
  let res = part1(i, 150);
  expect(res).toBe(1304);
});

test("sample2", () => {
  let i = parseInput(sample);
  let res = part2(i, 25);
  expect(res).toBe(3);
});

test("part2", () => {
  let i = parseInput(input);
  let res = part2(i, 150);
  expect(res).toBe(18);
});
