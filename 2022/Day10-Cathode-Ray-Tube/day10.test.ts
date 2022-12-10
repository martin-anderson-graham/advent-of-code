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
  let res = cpu.runProgram(ints.slice(0, 20));
  expect(res).toBe(13140);
});
