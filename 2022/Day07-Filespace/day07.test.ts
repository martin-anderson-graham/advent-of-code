import { sample, input } from "./input";
import { parseInput, findDirectorySize, totalSumUnderLimit } from "./day07";

test("sample", () => {
  let fs = parseInput(sample);

  let sizeSlash = findDirectorySize("/", fs);
  expect(sizeSlash).toBe(48381165);

  expect(fs.a.size).toBe(94853);
  expect(fs.e.size).toBe(584);
  expect(fs.d.size).toBe(24933642);

  let fs2 = parseInput(sample);
  let res = totalSumUnderLimit(fs2, 100000);
  expect(res).toBe(95437);
});

test("part1", () => {
  let fs = parseInput(input);
  let res = totalSumUnderLimit(fs, 100000);
  expect(res).toBe(10);
});
