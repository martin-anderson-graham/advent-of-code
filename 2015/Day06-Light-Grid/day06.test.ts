import { input } from "./input";
import { parseInput, countAfterJobs, brightness } from "./day06";

test("sample", () => {
  const i1 = parseInput("turn on 0,0 through 999,999");
  expect(i1).toEqual([
    {
      action: "on",
      startX: 0,
      startY: 0,
      endX: 999,
      endY: 999,
    },
  ]);
  const result = countAfterJobs(i1);
  expect(result).toBe(1000000);
});

test.skip("part1", () => {
  const i1 = parseInput(input);
  const result = countAfterJobs(i1);
  expect(result).toBe(400410);
});

test("sample", () => {
  const i1 = parseInput("toggle 0,0 through 999,999");
  const result = brightness(i1);
  expect(result).toBe(2000000);
});

test("part2", () => {
  const i1 = parseInput(input);
  const result = brightness(i1);
  expect(result).toBe(15343601);
});
