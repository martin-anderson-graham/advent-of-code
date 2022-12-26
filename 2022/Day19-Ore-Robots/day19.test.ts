import { sample, input } from "./input"
import { parseInput, part1 } from "./day19"

test("sample", () => {
    let i = parseInput(sample)
    let res = part1(24, i)
    expect(res).toBe(33)
})

