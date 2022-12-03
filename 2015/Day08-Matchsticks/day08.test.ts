import { sample, input } from "./input";
import { process1, count, process2 } from "./day08";

test("count", () => {
  let r1 = count('""');
  expect(r1).toBe(0);

  let r2 = count('"abc"');
  expect(r2).toBe(3);

  let r3 = count(String.raw`"aaa\"aaa"`);
  expect(r3).toBe(7);

  let r4 = count('"\x27"');
  expect(r4).toBe(1);
});

test("sample", () => {
  let result = process1(sample);
  expect(result).toBe(12);
});

test("part1", () => {
  let result = process1(input);
  expect(result).toBe(1371);
});

test("sample2", () => {
  let result = process2(sample);
  expect(result).toBe(19);
});

test("part2", () => {
  let result = process2(input);
  expect(result).toBe(2117);
});
