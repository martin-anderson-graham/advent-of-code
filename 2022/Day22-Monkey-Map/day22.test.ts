import { sample, input } from "./input"
import { parseInput } from "./day22"

test("basics", () => {
    let [board, ints] = parseInput(sample)
    let str = board.player.direction
    for (let i = 0; i < 5; i++) {
        board.player.turnRight()
        str += board.player.direction
    }
    expect(str).toBe(">v<^>v")
    str = board.player.direction
    for (let i = 0; i < 5; i++) {
        board.player.turnLeft()
        str += board.player.direction
    }
    expect(str).toBe("v>^<v>")

    board.player.row = 30
    board.player.col = 2
    board.player.direction = ">"
    expect(board.score()).toBe(31 * 1000 + 3 * 4 + 0)
    board.player.direction = "v"
    expect(board.score()).toBe(31 * 1000 + 3 * 4 + 1)
    board.player.direction = "<"
    expect(board.score()).toBe(31 * 1000 + 3 * 4 + 2)
    board.player.direction = "^"
    expect(board.score()).toBe(31 * 1000 + 3 * 4 + 3)

    let [nboard, nints] = parseInput(input)
    let justDirs = nints.filter(v => v === 'L' || v === 'R')
    nboard.player.direction = '>'
    justDirs.forEach(d => {
        if (d === 'L') {
            nboard.player.turnLeft()
        } else if (d === 'R') {
            nboard.player.turnRight()
        }
    })
    expect(nboard.player.direction).toBe('>')
})

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
    expect(res).toBe(27492)
})
