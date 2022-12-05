import { sample, input } from "./input";
import { part1, part2 } from "./day05";

test("sample", () => {
  let res = part1(sample);
  expect(res).toBe("CMZ");
});

test("part1", () => {
  let res = part1(input);
  expect(res).toBe("BSDMQFLSP");
});

test("sample2", () => {
  let res = part2(sample);
  expect(res).toBe("MCD");
});

test("part2", () => {
  let res = part2(input);
  expect(res).toBe("PGSQBFLDP");
});
