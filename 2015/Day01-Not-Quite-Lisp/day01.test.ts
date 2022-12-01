import { input } from "./input";
import { process, part2 } from "./day01";

test("samples", () => {
  let one = "(())";
  expect(process(one)).toBe(0);
});

test("part1", () => {
  expect(process(input)).toBe(74);
});

test("part2", () => {
  expect(part2(input)).toBe(1795);
});
