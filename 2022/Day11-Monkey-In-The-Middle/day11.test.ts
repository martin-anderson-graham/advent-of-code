import { parseInput } from "./day11";
import { sample, input } from "./input";

test("sample", () => {
  const monkeys = parseInput(sample);
  monkeys.forEach((monkey) => console.log(monkey.items));
});
