import { sample, input } from "./input";
import { parseInput, part1, part2, score1 } from "./day15";

test("score", () => {
  let i = parseInput(sample);
  let res = score1(i, { Butterscotch: 44, Cinnamon: 56 });
  expect(res).toBe(62842880);
});

test("sample", () => {
  let res = part1(sample, 100);
  expect(res).toBe(62842880);
});

test("part1", () => {
  let res = part1(input, 100);
  expect(res).toBe(13882464);
});

test("sample2", () => {
  let res = part2(sample, 100, 500);
  expect(res).toBe(57600000);
});

test("part2", () => {
  let res = part2(input, 100, 500);
  expect(res).toBe(11171160);
});
