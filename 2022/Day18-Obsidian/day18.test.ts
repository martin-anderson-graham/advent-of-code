import { sample, input  } from "./input";
import {parseInput, part1, part2} from "./day18"

test("sample1", () => {
    let i = parseInput(sample)
    expect(part1(i)).toBe(64)
})

test("part1", () => {
    let i = parseInput(input)
    expect(part1(i)).toBe(4512)
})

test("sample2", () => {
    let i = parseInput(sample)
    expect(part1(i)).toBe(58)
})
