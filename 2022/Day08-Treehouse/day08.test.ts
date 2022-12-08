import { sample, input } from "./input";
import {
  parseInput,
  countViewableCardinalTrees,
  findBestTreeView,
} from "./day08";

test("sample", () => {
  let i = parseInput(sample);
  let res = countViewableCardinalTrees(i);
  expect(res).toBe(21);
});

test("part1", () => {
  let i = parseInput(input);
  let res = countViewableCardinalTrees(i);
  expect(res).toBe(1798);
});

test("sample2", () => {
  let i = parseInput(sample);
  let res = findBestTreeView(i);
  expect(res).toBe(8);
});

test("part2", () => {
  let i = parseInput(input);
  let res = findBestTreeView(i);
  expect(res).toBe(259308);
});
