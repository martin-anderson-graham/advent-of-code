import { input } from "./input";
import {
  computeSinglePaper,
  totalPaper,
  parseInput,
  ribbon,
  totalRibbon,
} from "./day02";

test("computeSinglePaper", () => {
  expect(computeSinglePaper([2, 3, 4])).toBe(58);
  expect(computeSinglePaper([1, 1, 10])).toBe(43);
});

test("part1", () => {
  let i = parseInput(input);
  expect(totalPaper(i)).toBe(1598415);
});

test("ribbon", () => {
  expect(ribbon([2, 3, 4])).toBe(34);
  expect(ribbon([1, 1, 10])).toBe(14);
});

test("part2", () => {
  let i = parseInput(input);
  expect(totalRibbon(i)).toBe(3812909);
});
