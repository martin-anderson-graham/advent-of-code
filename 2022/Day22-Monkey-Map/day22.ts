type Direction = '^' | '>' | 'v' | '<'


class Player {
    row: number;
    col: number;
    direction: Direction
    directions: Direction[]

    constructor(x: number, y: number) {
        this.row = x
        this.col = y
        this.direction = '>'
        this.directions = ['^', '>', 'v', '<']
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

        //assumes right
        let changeArr: number[] = [0, 1]
        if (this.direction === '<') {
            changeArr = [0, -1]
        } else if (this.direction === 'v') {
            changeArr = [1, 0]
        } else if (this.direction === '^') {
            changeArr = [-1, 0]
        }

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

}

class Board {
    grid: string[][];
    player: Player;

    constructor(inputStr: string) {
        this.grid = []
        let maxLength = 0
        inputStr.split('\n').forEach(line => {
            if(line.length > maxLength) {
                maxLength = line.length
            }
            this.grid.push(line.split(''))
        })
        this.grid.forEach((row) => {
            while(row.length < maxLength) {
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
        this.player = new Player(0, col)
    }

    printGrid() {
        let str: string[] = []
        this.grid.forEach(line => str.push(line.join('')))
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

const parseInput = (str: string): [Board, (string | number)[]] => {
    let [boardString, instructionsString] = str.split('\n\n')
    let b = new Board(boardString)
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
