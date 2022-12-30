import { sample, input } from "./input"
import { findSolution, parseInput } from "./day24"

test("sample", () => {
    let [tornados, grid] = parseInput(sample)
    let res = findSolution(tornados, grid)
    expect(res).toBe(18)
})

test("part1", () => {
    let [tornados, grid] = parseInput(input)
    let res = findSolution(tornados, grid)
    expect(res).toBe(297)
})

test("sample2", () => {
    let [tornados, grid] = parseInput(sample)
    let res = findSolution(tornados, grid, true)
    expect(res).toBe(18)
})
