import { rocks, sample, input } from "./input";
import { parseInput, printGrid } from "./utils";
import { runSimulation } from "./day17";

test("sample", () => {
  let i = parseInput(rocks, sample);
  let res = runSimulation(i, 2022);
  expect(res).toBe(3068);
});

test("part1", () => {
  let i = parseInput(rocks, input);
  let res = runSimulation(i, 2022);
  expect(res).toBe(3161);
});

test("sample2", () => {
  // let i = parseInput(rocks, sample);
  // let res = runSimulation(i, 1000000000000);
  // expect(res).toBe(1514285714288);
});
