import {
  isValid,
  incrementString,
  findNextPassword,
  hasTwoPairs,
} from "./day11";

test("hasTwoPairs", () => {
  expect(hasTwoPairs("abrceffgk")).toBe(false);
  expect(hasTwoPairs("abbceffgk")).toBe(true);
});

test("isValid", () => {
  expect(isValid("hijklmmn")).toBe(false);
  expect(isValid("abbceffg")).toBe(false);
  expect(isValid("abbcegjk")).toBe(false);
  expect(isValid("abbcefgk")).toBe(false);
  expect(isValid("abcdffaa")).toBe(true);
  expect(isValid("abcdefhh")).toBe(false);
});

test("incrementString", () => {
  expect(incrementString("abcdefgh")).toBe("abcdefgi");
  expect(incrementString("ghijklmn")).toBe("ghijklmo");
  expect(incrementString("ghijkzzz")).toBe("ghijlaaa");
  expect(incrementString("abcdfezz")).toBe("abcdffaa");
});

test("findNextPassword", () => {
  expect(findNextPassword("abcdefgh")).toBe("abcdffaa");
  expect(findNextPassword("ghijklmn")).toBe("ghjaabcc");
});

test("part1", () => {
  expect(findNextPassword("cqjxjnds")).toBe("cqjxxyzz");
});

test("part2", () => {
  expect(findNextPassword(findNextPassword("cqjxjnds"))).toBe("cqkaabcc");
});
