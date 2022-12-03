import { sample, input } from "./input";
import {
  sumDoubleItems,
  parseInput,
  letterValue,
  findDuplicate,
  parseInput2,
  findBadges,
  sumBadges,
} from "./day03";

test("letterValue", () => {
  expect(letterValue("a")).toBe(1);
  expect(letterValue("z")).toBe(26);
  expect(letterValue("A")).toBe(27);
  expect(letterValue("Z")).toBe(52);
});

test("findDuplicate", () => {
  let res: string[] = [];
  let i1 = parseInput(sample);
  i1.forEach((r) => {
    res.push(findDuplicate(r));
  });
  expect(res).toEqual(["p", "L", "P", "v", "t", "s"]);
});

test("sample", () => {
  let i1 = parseInput(sample);
  let result = sumDoubleItems(i1);
  expect(result).toBe(157);
});

test("part1", () => {
  let i1 = parseInput(input);
  let result = sumDoubleItems(i1);
  expect(result).toBe(7917);
});

test("sample2", () => {
  let i1 = parseInput2(sample);
  let res: string[] = [];
  i1.forEach((arr) => {
    let l = findBadges(arr);
    res.push(l);
  });
  expect(res).toEqual(["r", "Z"]);

  expect(sumBadges(i1)).toBe(70);
});

test("part2", () => {
  let i1 = parseInput2(input);
  let result = sumBadges(i1);
  expect(result).toBe(2585);
});
