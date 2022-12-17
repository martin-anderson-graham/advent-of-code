import { sample, input } from "./input";
import {
  parseInput,
  findBestPath,
  preComputeMiniPaths,
  findBestPath2,
} from "./day16";
import { part2 } from "./part2";
test("sample", () => {
  let i = parseInput(sample);
  let res = findBestPath(i);
  expect(res).toBe(1651);
});

//takes 3 minutes...
test("part1", () => {
  let i = parseInput(input);
  let res = findBestPath(i);
  expect(res).toBe(2183);
});

test("sample2", () => {
  let i = parseInput(sample);
  let res = part2(i);
  expect(res).toBe(1707);
});

test("part2", () => {
  let i = parseInput(input);
  let res = part2(i);
  expect(res).toBe(2235);
});
