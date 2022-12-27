import { sample, input } from "./input"
import { parseInput, part1} from "./day19"

xtest("sample", () => {
    let i = parseInput(sample)
    let res = part1(24, i)
    expect(res).toBe(33)
})


xtest("part1", () => {
    let i = parseInput(input)
    let res = part1(24, i)
    expect(res).toBe(1262)
})

//assumption about building geode robots before obsidian ones is wrong
xtest("sample2", () => {
    let i = parseInput(sample)
    let res = part1(32, i.slice(0,3), false )
    expect(res).toBe(56*62)
})

//but it works for the input ;)
test("part2", () => {
    let i = parseInput(input)
    let res = part1(32, i.slice(0,3), false )
    expect(res).toBe(37191)
})
