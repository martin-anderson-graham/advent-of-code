import { input } from "./input";
import { numHousesVisited, numHousesVisited2 } from "./day03";

test("samples", () => {
  expect(numHousesVisited(">")).toBe(2);
  expect(numHousesVisited("^>v<")).toBe(4);
  expect(numHousesVisited("^v^v^v^v^v")).toBe(2);
});

test("part1", () => {
  expect(numHousesVisited(input)).toBe(2572);
});

test("samples2", () => {
  expect(numHousesVisited2("^v")).toBe(3);
  expect(numHousesVisited2("^>v<")).toBe(3);
  expect(numHousesVisited2("^v^v^v^v^v")).toBe(11);
});

test("part2", () => {
  expect(numHousesVisited2(input)).toBe(2631);
});
