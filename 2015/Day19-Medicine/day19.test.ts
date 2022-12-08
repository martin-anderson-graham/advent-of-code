import { parseInput, part1 } from "./day19";
import { sample1, sample2, input } from "./input";

test("sample", () => {
  let i = parseInput(sample1);
  let res = part1(i);
  expect(res).toBe(4);

  let i2 = parseInput(sample2);
  let res2 = part1(i2);
  expect(res2).toBe(7);
});

test("part1", () => {
  let res = part1(parseInput(input));
  expect(res).toBe(509);
});
