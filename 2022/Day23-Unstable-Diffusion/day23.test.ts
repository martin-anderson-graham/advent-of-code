import { sample1, sample2, input } from "./input"
import { parseInput, printElves, processRounds, scoreElves } from "./day23"

xtest("sample1", () => {
    let elves = parseInput(sample1)
    processRounds(3, elves)
    printElves(elves)
})

test("sample2", () => {
    let elves = parseInput(sample2)
    processRounds(10, elves)
    let res = scoreElves(elves)
    expect(res).toBe(110)
})

test("part1", () => {
    let elves = parseInput(input)
    processRounds(10, elves)
    let res = scoreElves(elves)
    expect(res).toBe(4049)
})

test("sample2-2", () => {
    let elves = parseInput(sample2)
    let res = processRounds(10, elves, true)
    expect(res).toBe(20)
})

test("part2", () => {
    let elves = parseInput(input)
    let res = processRounds(10, elves, true)
    expect(res).toBe(1021)
})
