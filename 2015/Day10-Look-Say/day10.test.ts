import { lookSay, part1 } from "./day10";

test("lookSay", () => {
  expect(lookSay("211")).toBe("1221");
  expect(lookSay("11")).toBe("21");
  expect(lookSay("21")).toBe("1211");
  expect(lookSay("1211")).toBe("111221");
  expect(lookSay("111221")).toBe("312211");
});

test("part1 test", () => {
  expect(part1("1", 5)).toBe("312211");
});

test("part1", () => {
  expect(part1("1113222113", 40).length).toBe(252594);
});

test("part2", () => {
  expect(part1("1113222113", 50).length).toBe(3579328);
});
