import { EdgeMapping, SideMapping } from "./input"
type Direction = '^' | '>' | 'v' | '<'


class Player {
    row: number;
    col: number;
    direction: Direction
    directions: Direction[]
    edgeMappings: Record<string, EdgeMapping>
    sideMappings: Record<string, SideMapping>
    currentSide: number;
    changeArrMapping: Record<Direction, number[]>

    constructor(x: number, y: number, edgeMappings: Record<string, EdgeMapping>, sideMappings: Record<string, SideMapping>) {
        this.row = x
        this.col = y
        this.direction = '>'
        this.directions = ['^', '>', 'v', '<']
        this.edgeMappings = edgeMappings
        this.sideMappings = sideMappings
        this.currentSide = 1
        this.changeArrMapping = {
            '>': [0, 1],
            'v': [1, 0],
            '<': [0, -1],
            '^': [-1, 0],
        }
    }

    turnLeft() {
        let idx = this.directions.indexOf(this.direction)
        idx--
        if (idx < 0) {
            idx = this.directions.length - 1
        }
        this.direction = this.directions[idx]
    }

    turnRight() {
        let idx = this.directions.indexOf(this.direction)
        idx++
        if (idx > this.directions.length - 1) {
            idx = 0
        }
        this.direction = this.directions[idx]
    }

    determineNextPosition(priorPosition: number[], grid: string[][], changeArr: number[]): number[] {
        let nextPosition = [priorPosition[0] + changeArr[0], priorPosition[1] + changeArr[1]]

        if (nextPosition[0] >= grid.length) {
            nextPosition[0] = 0
        } else if (nextPosition[0] < 0) {
            nextPosition[0] = grid.length - 1
        }
        if (nextPosition[1] >= grid[0].length) {
            nextPosition[1] = 0
        } else if (nextPosition[1] < 0) {
            nextPosition[1] = grid[0].length - 1
        }

        return nextPosition
    }

    determineNextCubePosition(priorPosition: number[], grid: string[][]): [number[], Direction] {
        let changeArr: number[] = this.changeArrMapping[this.direction]
        let newDirection = this.direction
        let side = this.sideMappings[this.currentSide]
        let nextPosition = [priorPosition[0] + changeArr[0], priorPosition[1] + changeArr[1]]
        //possibilites
        //1. no wrap (might change side or not, no change in direction)
        //2. new side, wrap, new direction
        //  a. wrap off of top/right/bottom/left

        //same side or new side without wrapping
        if (nextPosition[0] >= 0 && nextPosition[0] < grid.length &&
            nextPosition[1] >= 0 && nextPosition[1] < grid[0].length &&
            grid[nextPosition[0]][nextPosition[1]] !== ' ') {
            return [nextPosition, newDirection]
        }
        //need to wrap
        let transition = this.edgeMappings[`${this.currentSide}${this.direction}`]
        newDirection = transition.newDir
        let newSide = this.sideMappings[transition.newSide]
        if (nextPosition[0] < side.startRow) { //wrap top
            //compute the mapping of columns and rows based on the change of directions 
            let currentRelativeCol = priorPosition[1] - side.startCol
            if (newDirection === 'v') {
                let nextRelativeCol = newSide.endCol - newSide.startCol - currentRelativeCol
                nextPosition[0] = newSide.startRow
                nextPosition[1] = nextRelativeCol + newSide.startCol
            } else if (newDirection === '<') {
                let nextRelativeRow = newSide.endRow - newSide.startRow - currentRelativeCol
                nextPosition[0] = nextRelativeRow + newSide.startRow
                nextPosition[1] = newSide.endCol
            } else if (newDirection === '>') {
                let nextRelativeRow = currentRelativeCol
                nextPosition[0] = nextRelativeRow + newSide.startRow
                nextPosition[1] = newSide.startCol
            } else if (newDirection === '^') {
                nextPosition[0] = newSide.endRow
                nextPosition[1] = currentRelativeCol + newSide.startCol
            }
        } else if (nextPosition[0] > side.endRow) { //wrap bottom so direction = 'v'
            let currentRelativeCol = priorPosition[1] - side.startCol
            if (newDirection === '^') {
                let nextRelativeCol = newSide.endCol - newSide.startCol - currentRelativeCol
                nextPosition[0] = newSide.endRow
                nextPosition[1] = nextRelativeCol + newSide.startCol
            } else if (newDirection === '>') {
                let nextRelativeRow = newSide.endRow - newSide.startRow - currentRelativeCol
                nextPosition[0] = nextRelativeRow + newSide.startRow
                nextPosition[1] = newSide.startCol
            } else if (newDirection === '<') {
                let nextRelativeRow = currentRelativeCol
                nextPosition[0] = nextRelativeRow + newSide.startRow
                nextPosition[1] = newSide.endCol
            } else if (newDirection === 'v') {
                nextPosition[0] = newSide.startRow
                nextPosition[1] = currentRelativeCol + newSide.startCol
            }
        } else if (nextPosition[1] < side.startCol) { //wrap left so direction = '<'
            let currentRelativeRow = priorPosition[0] - side.startRow
            if (newDirection === 'v') {
                let nextRelativeCol = currentRelativeRow
                nextPosition[0] = newSide.startRow
                nextPosition[1] = nextRelativeCol + newSide.startCol
            } else if (newDirection === '^') {
                let nextRelativeCol = newSide.endCol - newSide.startCol - currentRelativeRow
                nextPosition[0] = newSide.endRow
                nextPosition[1] = nextRelativeCol + newSide.startCol
            } else if (newDirection === '>') {
                let nextRelativeRow = newSide.endRow - newSide.startRow - currentRelativeRow
                nextPosition[0] = nextRelativeRow + newSide.startRow
                nextPosition[1] = newSide.startCol
            } else if (newDirection === '<') {
                nextPosition[0] = currentRelativeRow + newSide.startRow
                nextPosition[1] = newSide.endCol
            }
        } else if (nextPosition[1] > side.endCol) { //wrap right so direction = '>'
            let currentRelativeRow = priorPosition[0] - side.startRow
            if (newDirection === 'v') {
                let nextRelativeCol = newSide.endCol - newSide.startCol - currentRelativeRow
                nextPosition[0] = newSide.startRow
                nextPosition[1] = nextRelativeCol + newSide.startCol
            } else if (newDirection === '<') {
                let nextRelativeRow = newSide.endRow - newSide.startRow - currentRelativeRow
                nextPosition[0] = nextRelativeRow + newSide.startRow
                nextPosition[1] = newSide.endCol
            } else if (newDirection === '^') {
                let nextRelativeCol = currentRelativeRow
                nextPosition[0] = newSide.endRow
                nextPosition[1] = newSide.startCol + nextRelativeCol
            } else if (newDirection === '>') {
                nextPosition[0] = currentRelativeRow + newSide.startRow
                nextPosition[1] = newSide.startCol
            }
        }
        return [nextPosition, newDirection]
    }
    wrapPosition(nextPosition: number[], grid: string[][], changeArr: number[]): number[] {
        let tempChangeArr: number[] = [changeArr[0] * -1, changeArr[1] * -1]
        nextPosition = this.determineNextPosition(nextPosition, grid, tempChangeArr)
        let nextCharacter = grid[nextPosition[0]][nextPosition[1]]
        while (nextCharacter !== ' ') {
            nextPosition = this.determineNextPosition(nextPosition, grid, tempChangeArr)
            nextCharacter = grid[nextPosition[0]][nextPosition[1]]
        }
        return this.determineNextPosition(nextPosition, grid, changeArr)
    }

    move(steps: number, grid: string[][]) {
        let changeArr: number[] = this.changeArrMapping[this.direction]

        let nextPosition = this.determineNextPosition([this.row, this.col], grid, changeArr)
        for (let i = 0; i < steps; i++) {
            let nextCharacter = grid[nextPosition[0]][nextPosition[1]]
            if (nextCharacter === ' ') {
                nextPosition = this.wrapPosition(nextPosition, grid, changeArr)
                nextCharacter = grid[nextPosition[0]][nextPosition[1]]
            }
            if (nextCharacter === '#') {
                return
            }
            this.row = nextPosition[0]
            this.col = nextPosition[1]
            nextPosition = this.determineNextPosition(nextPosition, grid, changeArr)
            grid[this.row][this.col] = this.direction
        }
    }

    determineCurrentSide() {
        return this.determineSide([this.row, this.col])
    }

    determineSide(position: number[]): number {
        for (let i = 1; i <= 6; i++) {
            let side = this.sideMappings[String(i)]
            if (position[0] >= side.startRow && position[0] <= side.endRow) {
                if (position[1] >= side.startCol && position[1] <= side.endCol) {
                    return i
                }
            }
        }
        console.log(this.sideMappings)
        console.log(position, this.direction)
        throw new Error("You must be on a side")
    }

    moveCube(steps: number, grid: string[][]) {
        this.currentSide = this.determineCurrentSide();
        let [nextPosition, nextDirection] = this.determineNextCubePosition([this.row, this.col], grid);
        for (let i = 0; i < steps; i++) {
            let nextCharacter = grid[nextPosition[0]][nextPosition[1]]
            // if (nextCharacter === ' ') {
            //     [nextPosition, nextDirection] = this.determineNextCubePosition([this.row, this.col], grid)
            //     nextCharacter = grid[nextPosition[0]][nextPosition[1]]
            // }
            if (nextCharacter === '#') {
                return
            }

            this.row = nextPosition[0]
            this.col = nextPosition[1]
            this.direction = nextDirection;
            this.currentSide = this.determineCurrentSide();
            [nextPosition, nextDirection] = this.determineNextCubePosition(nextPosition, grid)
            grid[this.row][this.col] = this.direction
        }
    }
}

class Board {
    grid: string[][];
    player: Player;
    edgeMappings: Record<string, EdgeMapping>
    sideMappings: Record<string, SideMapping>

    constructor(inputStr: string, edgeMappings: Record<string, EdgeMapping> = {}, sideMappings: Record<string, SideMapping> = {}) {
        this.grid = []
        let maxLength = 0
        inputStr.split('\n').forEach(line => {
            if (line.length > maxLength) {
                maxLength = line.length
            }
            this.grid.push(line.split(''))
        })
        this.grid.forEach((row) => {
            while (row.length < maxLength) {
                row.push(' ')
            }
        })

        let col = 0
        for (let i = 0; i < this.grid[0].length; i++) {
            if (this.grid[0][i] === '.') {
                col = i
                break
            }
        }
        this.edgeMappings = edgeMappings
        this.sideMappings = sideMappings
        this.player = new Player(0, col, this.edgeMappings, this.sideMappings)

    }

    printGrid() {
        let str: string[] = []
        this.grid.forEach(line => str.push(line.join('')))
        console.log(str.join('\n'))
    }

    printSide(side: number) {
        let str: string[] = []
        let s = this.sideMappings[side]
        for (let r = s.startRow; r <= s.endRow; r++) {
            let line = ''
            for (let c = s.startCol; c <= s.endCol; c++) {
                line += this.grid[r][c]
            }
            str.push(line)
        }
        console.log(str.join('\n'))
    }

    processInstructions(ints: (string | number)[]): void {
        ints.forEach(int => {
            if (int === 'L') {
                this.player.turnLeft()
                this.grid[this.player.row][this.player.col] = this.player.direction
            } else if (int === 'R') {
                this.player.turnRight()
                this.grid[this.player.row][this.player.col] = this.player.direction
            } else if (typeof int === 'number') {
                this.player.move(int, this.grid)
            }
        })
    }

    processInstructionsCube(ints: (string | number)[]): void {
        ints.forEach(int => {
            if (int === 'L') {
                this.player.turnLeft()
                this.grid[this.player.row][this.player.col] = this.player.direction
            } else if (int === 'R') {
                this.player.turnRight()
                this.grid[this.player.row][this.player.col] = this.player.direction
            } else if (typeof int === 'number') {
                let toPrint = {
                    row: this.player.row,
                    col: this.player.col,
                    direction: this.player.direction,
                    currentSide: this.player.currentSide
                }
                // console.log(int,toPrint)
                this.player.moveCube(int, this.grid)
            }
        })
    }

    score() {
        let dir = 0
        if (this.player.direction === '>') {
            dir = 0
        } else if (this.player.direction === 'v') {
            dir = 1
        } else if (this.player.direction === '<') {
            dir = 2
        } else if (this.player.direction === '^') {
            dir = 3
        }
        return 1000 * (this.player.row + 1) + 4 * (this.player.col + 1) + dir
    }
}

const parseInput = (str: string, edgeMappings: Record<string, EdgeMapping> = {}, sideMappings: Record<string, SideMapping> = {}): [Board, (string | number)[]] => {
    let [boardString, instructionsString] = str.split('\n\n')
    let b = new Board(boardString, edgeMappings, sideMappings)
    let instructions: (string | number)[] = []

    let currentInt = ''
    for (let i = 0; i < instructionsString.length; i++) {
        let next = instructionsString.charAt(i)
        if (Number.isInteger(Number(next))) {
            if (currentInt === '' || Number.isInteger(Number(currentInt))) {
                currentInt += next
            } else {
                instructions.push(currentInt)
                currentInt = next
            }
        } else {
            if (Number.isInteger(Number(currentInt))) {
                instructions.push(Number(currentInt))
                currentInt = next
            } else {
                instructions.push(currentInt)
                currentInt = next
            }
        }
    }
    if (Number.isInteger(Number(currentInt))) {
        instructions.push(Number(currentInt))
    } else {
        instructions.push(currentInt)
    }
    return [b, instructions]
}

export {
    parseInput
}
