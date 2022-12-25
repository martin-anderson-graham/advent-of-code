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
    expect(part2(i)).toBe(58)
})

test("part2", () => {
    let i = parseInput(input)
    //897 too low
    //943 too low
    //1045 too low
    //2549 not the right answer
    expect(part2(i)).toBe(2554)
})
