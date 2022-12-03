import { sample, input } from "./input";
import { parseInput, process, process2 } from "./day07";

test("sample", () => {
  let i1 = parseInput(sample);
  let result = process(i1);
  expect(result).toBeUndefined();
});

test("part1", () => {
  let i1 = parseInput(input);
  let result = process(i1);
  expect(result).toBe(46065);
});

test("part2", () => {
  let i1 = parseInput(input);
  let result = process2(i1);
  expect(result).toBe(14134);
});
