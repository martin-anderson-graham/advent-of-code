import { sample, input } from "./input";
import { CPU, parseInput } from "./day10";

test("parseInput", () => {
  let res = parseInput(`noop\naddx -3`);
  expect(res).toEqual([
    { op: "noop" },
    { op: "add", register: "x", value: -3 },
  ]);
});

test("sample", () => {
  let ints = parseInput(sample);
  let cpu = new CPU();
  let res = cpu.runProgram1(ints);
  expect(res).toBe(13140);
});

test("part1", () => {
  let ints = parseInput(input);
  let cpu = new CPU();
  let res = cpu.runProgram1(ints);
  expect(res).toBe(15020);
});

test("sample2", () => {
  let ints = parseInput(sample);
  let cpu = new CPU();
  let res = cpu.renderScreen(ints);
  // expect(res).toBe(13140);
});

test("part2", () => {
  let ints = parseInput(input);
  let cpu = new CPU();
  let res = cpu.renderScreen(ints);
  // expect(res).toBe(13140);
});
