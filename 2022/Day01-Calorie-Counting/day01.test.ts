import { sample1, input } from "./input";
import { parseInput, part1, part2 } from "./day01";

test("sample1", () => {
  let i1 = parseInput(sample1);
  let r1 = part1(i1);
  expect(r1).toBe(24000);
});

test("part1", () => {
  let i2 = parseInput(input);
  let r2 = part1(i2);
  expect(r2).toBe(71934);
});

test("sample1, part 2", () => {
  let i1 = parseInput(sample1);
  let r1 = part2(i1);
  expect(r1).toBe(45000);
});

test("part 2", () => {
  let i1 = parseInput(input);
  let r1 = part2(i1);
  expect(r1).toBe(211447);
});
