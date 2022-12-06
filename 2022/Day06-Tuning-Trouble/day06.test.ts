import { input } from "./input";
import { part1, part2 } from "./day06";

test("sample", () => {
  expect(part1("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toBe(7);
  expect(part1("bvwbjplbgvbhsrlpgdmjqwftvncz")).toBe(5);
  expect(part1("nppdvjthqldpwncqszvftbrmjlhg")).toBe(6);
  expect(part1("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toBe(11);
  expect(part1("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toBe(10);
});

test("part1", () => {
  expect(part1(input)).toBe(1855);
});

test("part2", () => {
  expect(part2(input)).toBe(3256);
});
