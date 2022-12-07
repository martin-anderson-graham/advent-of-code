import { key, input } from "./input";
import { part1, part2 } from "./day16";

test("part1", () => {
  let res = part1(key, input);
  expect(res).toBe(40);
});

test("part2", () => {
  let res = part2(key, input);
  expect(res).toBe(241);
});
