import { sample, input } from "./input";
import {
  parseInput,
  findBestPath,
  preComputeMiniPaths,
  findBestPath2,
} from "./day16";

test("sample", () => {
  let i = parseInput(sample);
  let res = findBestPath(i);
  expect(res).toBe(1651);
});

//takes 3 minutes...
xtest("part1", () => {
  let i = parseInput(input);
  let res = findBestPath(i);
  expect(res).toBe(2183);
});

test("sample2", () => {
  let i = parseInput(sample);
  let res = findBestPath2(i);
  expect(res).toBe(1707);
});
