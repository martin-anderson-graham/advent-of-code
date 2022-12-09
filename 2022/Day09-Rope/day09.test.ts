import { sample, input, sample2 } from "./input";
import { parseInput, processMoves } from "./day09";

test("sample", () => {
  let moves = parseInput(sample);
  let res = processMoves(moves, 2);
  expect(res).toBe(13);
});

test("part1", () => {
  let moves = parseInput(input);
  let res = processMoves(moves, 2);
  expect(res).toBe(6284);
});

test("sample2", () => {
  let moves = parseInput(sample2);
  let res = processMoves(moves, 10);
  expect(res).toBe(36);
});

test("part2", () => {
  let moves = parseInput(input);
  let res = processMoves(moves, 10);
  expect(res).toBe(2661);
});
