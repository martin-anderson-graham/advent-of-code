import { rocks, sample, input } from "./input";
import { parseInput, printGrid } from "./utils";
import { runSimulation } from "./day17";

test("sample", () => {
  let i = parseInput(rocks, sample);
  let res = runSimulation(i, 1);
});
