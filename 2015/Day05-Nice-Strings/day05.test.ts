import { input } from "./input";
import { isNice, countNice, newNice, countNewNice } from "./day05";

test("isNice", () => {
  expect(isNice("ugknbfddgicrmopn")).toBe(true);
  expect(isNice(`aaa`)).toBe(true);
  expect(isNice("jchzalrnumimnmhp")).toBe(false);
  expect(isNice("haegwjzuvuyypxyu")).toBe(false);
  expect(isNice("dvszwmarrgswjxmb")).toBe(false);
});

test("part1", () => {
  expect(countNice(input)).toBe(255);
});

test("newNice", () => {
  expect(newNice("qjhvhtzxzqqjkmpb")).toBe(true);
  expect(newNice(`xxyxx`)).toBe(true);
  expect(newNice("uurcxstgmygtbstg")).toBe(false);
  expect(newNice("ieodomkazucvgmuy")).toBe(false);
});

test("part2", () => {
  expect(countNewNice(input)).toBe(55);
});
