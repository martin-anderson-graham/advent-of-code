import { countJSON } from "./day12";
import { input } from "./input";

test("samples", () => {
  expect(countJSON("[1,2,3]")).toBe(6);
  expect(countJSON(`{"a":2,"b":4}`)).toBe(6);
  expect(countJSON(`[[[3]]]`)).toBe(3);
  expect(countJSON(`{"a":{"b":4},"c":-1}`)).toBe(3);
  expect(countJSON(`[]`)).toBe(0);
  expect(countJSON(`{}`)).toBe(0);
});

test("part1", () => {
  expect(countJSON(input)).toBe(191164);
});

test("part2", () => {
  expect(countJSON(input, true)).toBe(87842);
});
