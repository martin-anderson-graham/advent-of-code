import { sample, input, sampleEdgeMappings, sampleSideMappings, inputEdgeMappings, inputSideMappings } from "./input"
import { parseInput } from "./day22"

test("sidemappings", () => {
    let grid:string[][] = []
    for(let r = 0; r < 12; r++) {
        grid.push(new Array(12).fill(' '))
    }
    for(let i = 1; i <= 6; i++) {
        let side = sampleSideMappings[i]
        for (let r = side.startRow; r<=side.endRow; r++) {
            for (let c = side.startCol; c <= side.endCol; c++) {
                grid[r][c] = String(i)
            }
        }
    }
    // console.log(grid.map(l => l.join('')).join('\n'))
})

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

test("cube wrappings", () => {
    let [board, ints] = parseInput(input, inputEdgeMappings, inputSideMappings)
    //from 1 to 6
    board.player.row = 0
    board.player.col = 50
    board.player.direction = '^'
    let nextPosition = board.player.determineNextCubePosition([0,50], board.grid)
    expect(nextPosition).toEqual([[150, 0], '>'])
    //from 6 to 1
    board.player.row =150 
    board.player.col = 0
    board.player.currentSide = board.player.determineCurrentSide()
    board.player.direction = '<'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[0, 50], 'v'])
    //from 1 to 2
    board.player.row = 0
    board.player.col = 99 
    board.player.currentSide = board.player.determineCurrentSide()
    board.player.direction = '>'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[0, 100], '>'])
    //from 2 to 1
    board.player.row = 0 
    board.player.col = 100 
    board.player.currentSide = board.player.determineCurrentSide()
    board.player.direction = '<'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[0, 99], '<'])
    //from 1 to 4
    board.player.row = 0 
    board.player.col = 50 
    board.player.currentSide = board.player.determineCurrentSide()
    board.player.direction = '<'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[149, 0], '>'])
    //from 4 to 1
    board.player.row = 149 
    board.player.col = 0 
    board.player.currentSide = board.player.determineCurrentSide()
    board.player.direction = '<'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[0, 50], '>'])
    //from 1 to 3
    board.player.row = 49 
    board.player.col = 50 
    board.player.currentSide = board.player.determineCurrentSide()
    board.player.direction = 'v'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[50, 50], 'v'])
    //from 3 to 1
    board.player.row = 50 
    board.player.col = 50 
    board.player.currentSide = board.player.determineCurrentSide()
    board.player.direction = '^'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[49, 50], '^'])
    //from 2 to 3
    board.player.row = 49 
    board.player.col = 100 
    board.player.currentSide = board.player.determineCurrentSide()
    expect(board.player.currentSide).toBe(2)
    board.player.direction = 'v'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[50, 99], '<'])
    //from 3 to 2
    board.player.row = 50 
    board.player.col = 99 
    board.player.currentSide = board.player.determineCurrentSide()
    expect(board.player.currentSide).toBe(3)
    board.player.direction = '>'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[49, 100], '^'])
    //from 2 to 5
    board.player.row = 0 
    board.player.col = 149 
    board.player.currentSide = board.player.determineCurrentSide()
    expect(board.player.currentSide).toBe(2)
    board.player.direction = '>'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[149, 99], '<'])
    //from 5 to 2
    board.player.row = 149 
    board.player.col = 99 
    board.player.currentSide = board.player.determineCurrentSide()
    expect(board.player.currentSide).toBe(5)
    board.player.direction = '>'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[0, 149], '<'])
    //from 2 to 6
    board.player.row = 0 
    board.player.col = 149 
    board.player.currentSide = board.player.determineCurrentSide()
    expect(board.player.currentSide).toBe(2)
    board.player.direction = '^'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[199, 49], '^'])
    //from 6 to 2
    board.player.row = 199 
    board.player.col = 49 
    board.player.currentSide = board.player.determineCurrentSide()
    expect(board.player.currentSide).toBe(6)
    board.player.direction = 'v'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[0, 149], 'v'])
    //from 3 to 4
    board.player.row = 50 
    board.player.col = 50 
    board.player.currentSide = board.player.determineCurrentSide()
    expect(board.player.currentSide).toBe(3)
    board.player.direction = '<'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[100, 0], 'v'])
    //from 4 to 3
    board.player.row = 100 
    board.player.col = 0 
    board.player.currentSide = board.player.determineCurrentSide()
    expect(board.player.currentSide).toBe(4)
    board.player.direction = '^'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[50, 50], '>'])
    //from 3 to 5
    board.player.row = 99 
    board.player.col = 50 
    board.player.currentSide = board.player.determineCurrentSide()
    expect(board.player.currentSide).toBe(3)
    board.player.direction = 'v'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[100, 50], 'v'])
    //from 5 to 3
    board.player.row = 100 
    board.player.col = 50 
    board.player.currentSide = board.player.determineCurrentSide()
    expect(board.player.currentSide).toBe(5)
    board.player.direction = '^'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[99, 50], '^'])
    //from 4 to 5
    board.player.row = 100 
    board.player.col = 49 
    board.player.currentSide = board.player.determineCurrentSide()
    expect(board.player.currentSide).toBe(4)
    board.player.direction = '>'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[100, 50], '>'])
    //from 5 to 4
    board.player.row = 100 
    board.player.col = 50 
    board.player.currentSide = board.player.determineCurrentSide()
    expect(board.player.currentSide).toBe(5)
    board.player.direction = '<'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[100, 49], '<'])
    //from 4 to 6
    board.player.row = 149 
    board.player.col = 49 
    board.player.currentSide = board.player.determineCurrentSide()
    expect(board.player.currentSide).toBe(4)
    board.player.direction = 'v'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[150, 49], 'v'])
    //from 6 to 4
    board.player.row = 150 
    board.player.col = 49 
    board.player.currentSide = board.player.determineCurrentSide()
    expect(board.player.currentSide).toBe(6)
    board.player.direction = '^'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[149, 49], '^'])
    //from 5 to 6
    board.player.row = 149 
    board.player.col = 50 
    board.player.currentSide = board.player.determineCurrentSide()
    expect(board.player.currentSide).toBe(5)
    board.player.direction = 'v'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[150, 49], '<'])
    //from 6 to 5
    board.player.row = 150 
    board.player.col = 49 
    board.player.currentSide = board.player.determineCurrentSide()
    expect(board.player.currentSide).toBe(6)
    board.player.direction = '>'
    nextPosition = board.player.determineNextCubePosition([board.player.row, board.player.col], board.grid)
    expect(nextPosition).toEqual([[149, 50], '^'])
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

test("sample2", () => {
    let [board, ints] = parseInput(sample, sampleEdgeMappings, sampleSideMappings)
    board.processInstructionsCube(ints)
    let res = board.score()
    expect(res).toBe(5031)
})

test("part2", () => {
    let [board, ints] = parseInput(input, inputEdgeMappings, inputSideMappings)
    board.processInstructionsCube(ints)
    let res = board.score()
    //162052 too high
    expect(res).toBe(78291)
})
