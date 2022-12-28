import { sample, input } from "./input"
import { findRootValue, findYourValue, parseInput } from "./day21"

test("sample", () => {
    let i = parseInput(sample)
    let res = findRootValue(i)
    expect(res).toBe(152)
})

test("part1", () => {
    let i = parseInput(input)
    let res = findRootValue(i)
    expect(res).toBe(87457751482938)
})

test("sample2", () => {
    let i = parseInput(sample)
    let res = findYourValue(i)
    expect(res).toBe(301)
})

test("part2", () => {
    let i = parseInput(input)
    let res = findYourValue(i)
    expect(res).toBe(3221245824363)
})
