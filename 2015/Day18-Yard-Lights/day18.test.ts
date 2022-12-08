import { sample, input, sample2, input2 } from "./input";
import { parseInput, part1 } from "./day18";

test("sample", () => {
  let i = parseInput(sample);
  let res = part1(i, 4);
  expect(res).toBe(4);
});

test("part1", () => {
  let i = parseInput(input);
  let res = part1(i, 100);
  expect(res).toBe(1061);
});

test("sample2", () => {
  let i = parseInput(sample2);
  let res = part1(i, 5, true);
  expect(res).toBe(17);
});

test("sample2", () => {
  let i = parseInput(input2);
  let res = part1(i, 100, true);
  expect(res).toBe(1006);
});
