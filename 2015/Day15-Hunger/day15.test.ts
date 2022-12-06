import { sample, input } from "./input";
import { parseInput, part1 } from "./day15";

test("sample", () => {
  let res = part1(sample, 100);
  expect(res).toBe(62842880);
});
