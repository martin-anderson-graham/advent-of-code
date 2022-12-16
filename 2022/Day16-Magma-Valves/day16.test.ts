import { sample, input } from "./input";
import { parseInput, findBestPath } from "./day16";

test("sample", () => {
  let i = parseInput(sample);
  let res = findBestPath(i);
  expect(res).toBe(1651);
});
