import { sample, input } from "./input"
import { parseInput } from "./day22"

test("sample", () => {
    let [board, ints] = parseInput(sample)
    board.processInstructions(ints)
    let res = board.score()
    expect(res).toBe(6032)
})

test("part1", () => {
    let [board, ints] = parseInput(input)
    board.processInstructions(ints)
    let res = board.score()
    //60284 is too high
    expect(res).toBe(6032)
})
