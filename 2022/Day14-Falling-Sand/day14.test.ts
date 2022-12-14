import { sample, input } from "./input";
import { part1, parseInput, printGrid, part2 } from "./day14";

test("sample", () => {
  let i = parseInput(sample);
  let res = part1(i.grid);
  expect(res).toBe(24);
});

test("part1", () => {
  let i = parseInput(input);
  let res = part1(i.grid);
  expect(res).toBe(578);
});

test("sample2", () => {
  let i = parseInput(sample);
  let res = part2(i.grid, i.maxY);
  expect(res).toBe(93);
});

test("part2", () => {
  let i = parseInput(input);
  let res = part2(i.grid, i.maxY);
  expect(res).toBe(24377);
});
