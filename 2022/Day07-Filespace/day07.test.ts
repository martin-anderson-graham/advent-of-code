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

xtest("troubleshooting1", () => {
  let a = input.split("\n").filter((l) => l.slice(0, 4) === "$ cd");
  let depth = 0;
  let res = [];
  console.log(a.join("\n"));
  a.forEach((r, idx) => {
    let arr = r.split(" ");
    if (arr[2] === "..") {
      depth -= 1;
    } else {
      depth += 1;
    }
    res.push(depth + " " + String(idx));
  });
  console.log(res.join("\n"));
});

xtest("troubleshooting", () => {
  let i = 39;
  let short = input.split("\n").slice(0, i).join("\n");
  let fs = parseInput(short);
  let res = totalSumUnderLimit(fs, 100000);
  expect(res).toBe(10);
});

test("part1", () => {
  let fs = parseInput(input);
  console.log(fs);
  let res = totalSumUnderLimit(fs, 100000);
  expect(res).toBe(10);
});
