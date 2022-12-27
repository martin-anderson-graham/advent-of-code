import { sample, input } from "./input"
import { parseInput, part1, part2 } from "./day19"

test("sample", () => {
    let i = parseInput(sample)
    let res = part1(24, i)
    expect(res).toBe(33)
})


xtest("sample", () => {
    let i = parseInput(input)
    let res = part1(24, i)
    expect(res).toBe(1262)
})


xtest("sample2", () => {
    let i = parseInput(sample)
    let res = part2(32, i.slice(0,3))
    expect(res).toBe(62)
})
