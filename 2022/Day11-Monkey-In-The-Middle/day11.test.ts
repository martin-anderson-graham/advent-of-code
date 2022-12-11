import { parseInput, processRound, processRounds } from "./day11";
import { sample, input } from "./input";

test("sample", () => {
  const monkeys = parseInput(sample);
  let res = processRounds(monkeys, 20);
  expect(res).toBe(10605);
});

test("part1 parsing check", () => {
  const monkeys = parseInput(input);
  let i = { worry: 3 };
  monkeys.forEach((monkey) => {
    monkey.operation(i);
  });
  expect(i.worry).toBe(42573);
});

test("part1", () => {
  const monkeys = parseInput(input);
  let res = processRounds(monkeys, 20);
  expect(res).toBe(66124);
});

test("sample2", () => {
  const monkeys = parseInput(sample);
  let res = processRounds(monkeys, 10000, false);
  expect(res).toBe(2713310158);
});

test("part2", () => {
  const monkeys = parseInput(input);
  let res = processRounds(monkeys, 10000, false);
  expect(res).toBe(19309892877);
});
