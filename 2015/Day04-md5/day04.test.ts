import { part1, isValid1, part2 } from "./day04";

test("isValid", () => {
  expect(isValid1("0000033")).toBe(true);
  expect(isValid1("00003333")).toBe(false);
});

test.skip("samples", () => {
  expect(part1("abcdef")).toBe(609043);
  expect(part1("pqrstuv")).toBe(1048970);
});

test.skip("part1", () => {
  expect(part1("ckczppom")).toBe(117946);
});

test.skip("part2", () => {
  expect(part2("ckczppom")).toBe(3938038);
});
