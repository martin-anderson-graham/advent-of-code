import { sample, input } from "./input";
import { parseInput, shortestRoute, longestRoute } from "./day09";

test("sample", () => {
  const inp = parseInput(sample);
  let result = shortestRoute(inp);
  expect(result).toBe(605);
});

test("part1", () => {
  const inp = parseInput(input);
  let result = shortestRoute(inp);
  expect(result).toBe(251);
});

test("sample2", () => {
  const inp = parseInput(sample);
  let result = longestRoute(inp);
  expect(result).toBe(982);
});

test("part2", () => {
  const inp = parseInput(input);
  let result = longestRoute(inp);
  expect(result).toBe(898);
});
