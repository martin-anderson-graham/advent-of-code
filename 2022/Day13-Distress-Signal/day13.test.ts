import { sample, input } from "./input";
import { parseInput, countValidPairs, sortPackets } from "./day13";

test("sample", () => {
  // let one = countValidPairs([
  //   [
  //     [1, 1, 3, 1, 1],
  //     [1, 1, 5, 1, 1],
  //   ],
  // ]);
  // expect(one).toBe(1);

  let i = parseInput(sample);
  let res = countValidPairs(i);
  expect(res).toBe(13);
});

test("part1", () => {
  let i = parseInput(input);
  let res = countValidPairs(i);
  expect(res).toBe(5366);
});

test("sample2", () => {
  let i = parseInput(sample);
  let res = sortPackets(i);
  expect(res).toBe(140);
});

test("part2", () => {
  let i = parseInput(input);
  let res = sortPackets(i);
  expect(res).toBe(23391);
});
