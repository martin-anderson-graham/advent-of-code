import { sample, input } from "./input";
import { parseInput, scoreRow, findTuningFrequency } from "./day15";

test("sample", () => {
  let i = parseInput(sample);
  // markGrid(i);
  let res = scoreRow(i.grid, i.sensors, 10);
  // console.log(i.grid.map((row) => row.join("")).join("\n"));
  expect(res).toBe(26);
});

test("part1", () => {
  let i = parseInput(input);
  // markGrid(i);
  let res = scoreRow(i.grid, i.sensors, 2000000);
  // console.log(i.grid.map((row) => row.join("")).join("\n"));
  expect(res).toBe(4717631);
});

test("sample2", () => {
  let i = parseInput(sample);
  // markGrid(i);
  let res = findTuningFrequency(i.sensors, 20);
  // console.log(i.grid.map((row) => row.join("")).join("\n"));
  expect(res).toBe(56000011);
});

test("part2", () => {
  let i = parseInput(input);
  // markGrid(i);
  let res = findTuningFrequency(i.sensors, 4000000);
  // console.log(i.grid.map((row) => row.join("")).join("\n"));
  expect(res).toBe(13197439355220);
});
