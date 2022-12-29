const getLocStr = (r: number, c: number): string => {
    return `${r},${c}`
}
class Elf {
    r: number;
    c: number;
    proposedMoveString: string
    constructor(r: number, c: number) {
        this.r = r
        this.c = c
        this.proposedMoveString = ''
    }

    getLocStr(): string {
        return getLocStr(this.r, this.c)
    }
}

type Elves = Record<string, Elf>

const parseInput = (str: string): Elves => {
    let elves: Elves = {}
    let eIdx = 0
    str.split('\n').forEach((line, r) => {
        line.split('').forEach((l, c) => {
            if (l === '#') {
                elves[getLocStr(r, c)] = new Elf(r, c)
                eIdx++
            }
        })
    })

    return elves
}
let directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
]

const checkNorth = (elves: Elves, elf: Elf): boolean => {
    return elves[getLocStr(elf.r + directions[0][0], elf.c + directions[0][1])] === undefined &&
        elves[getLocStr(elf.r + directions[1][0], elf.c + directions[1][1])] === undefined &&
        elves[getLocStr(elf.r + directions[2][0], elf.c + directions[2][1])] === undefined
}

const checkSouth = (elves: Elves, elf: Elf): boolean => {
    return elves[getLocStr(elf.r + directions[5][0], elf.c + directions[5][1])] === undefined &&
        elves[getLocStr(elf.r + directions[6][0], elf.c + directions[6][1])] === undefined &&
        elves[getLocStr(elf.r + directions[7][0], elf.c + directions[7][1])] === undefined
}

const checkWest = (elves: Elves, elf: Elf): boolean => {
    return elves[getLocStr(elf.r + directions[0][0], elf.c + directions[0][1])] === undefined &&
        elves[getLocStr(elf.r + directions[3][0], elf.c + directions[3][1])] === undefined &&
        elves[getLocStr(elf.r + directions[5][0], elf.c + directions[5][1])] === undefined
}

const checkEast = (elves: Elves, elf: Elf): boolean => {
    return elves[getLocStr(elf.r + directions[2][0], elf.c + directions[2][1])] === undefined &&
        elves[getLocStr(elf.r + directions[4][0], elf.c + directions[4][1])] === undefined &&
        elves[getLocStr(elf.r + directions[7][0], elf.c + directions[7][1])] === undefined
}

const checkNoMove = (elves: Elves, elf: Elf): boolean => {
    for (let i = 0; i < directions.length; i++) {
        if (elves[getLocStr(elf.r + directions[i][0], elf.c + directions[i][1])]) {
            return false
        }
    }
    return true
}

type ProposedMove = {
    oneElf: boolean;
    twoElfs: boolean;
}

const getProposedMove = (elves: Elves, elf: Elf, roundIndex: number): string => {
    if (checkNoMove(elves, elf)) {
        return elf.getLocStr()
    }
    for (let i = 0; i < 4; i++) {
        let idx = (i + roundIndex) % 4
        if (idx === 0) {
            if (checkNorth(elves, elf)) {
                return getLocStr(elf.r - 1, elf.c)
            }
        } else if (idx === 1) {
            if (checkSouth(elves, elf)) {
                return getLocStr(elf.r + 1, elf.c)
            }
        } else if (idx === 2) {
            if (checkWest(elves, elf)) {
                return getLocStr(elf.r, elf.c - 1)
            }
        } else if (idx === 3) {
            if (checkEast(elves, elf)) {
                return getLocStr(elf.r, elf.c + 1)
            }
        }
    }
    return elf.getLocStr()
}

const generateProposedMoves = (elves: Elves, roundIndex: number, elfArr: Elf[]): Record<string, ProposedMove> => {
    let proposedMoves: Record<string, ProposedMove> = {}

    elfArr.forEach(elf => {
        let proposedMoveString = getProposedMove(elves, elf, roundIndex)
        elf.proposedMoveString = proposedMoveString
        if (proposedMoves[proposedMoveString] === undefined) {
            proposedMoves[proposedMoveString] = {
                oneElf: true,
                twoElfs: false,
            }
        } else if (proposedMoves[proposedMoveString].oneElf) {
            proposedMoves[proposedMoveString].twoElfs = true
        }

    })

    return proposedMoves
}

const moveElf = (elf: Elf, elves: Elves): void => {
    delete elves[elf.getLocStr()]
    let [r, c] = elf.proposedMoveString.split(',').map(e => Number(e))
    elf.r = r
    elf.c = c
    elves[elf.getLocStr()] = elf

}

const executeProposedMoves = (proposedMoves: Record<string, ProposedMove>, elves: Elves, elfArr: Elf[]): boolean => {
    let someMoved = false
    elfArr.forEach(elf => {
        if (proposedMoves[elf.proposedMoveString].twoElfs !== true) {
            if (elf.proposedMoveString !== elf.getLocStr()) {
                someMoved = true
            }
            moveElf(elf, elves)
        }
    })
    return someMoved
}

const processRound = (elves: Elves, roundIndex: number, elfArr: Elf[]): boolean => {
    const proposedMoves = generateProposedMoves(elves, roundIndex, elfArr)
    return executeProposedMoves(proposedMoves, elves, elfArr)

}

const processRounds = (numRounds: number, elves: Elves, part2: boolean = false): number => {
    let elfArr: Elf[] = Object.values(elves)
    if (!part2) {
        for (let i = 0; i < numRounds; i++) {
            let someMoved = processRound(elves, i, elfArr)
        }
    } else {
        let roundIndex = 0
        while (true) {
            let someMoved = processRound(elves, roundIndex, elfArr)
            if (!someMoved) {
                return roundIndex + 1
            }

            roundIndex++
        }
    }
    return -1
}

const printElves = (elves: Elves): void => {
    let str: string[] = []
    let minRow = Math.min(...Object.values(elves).map(e => e.r))
    let maxRow = Math.max(...Object.values(elves).map(e => e.r))
    let minCol = Math.min(...Object.values(elves).map(e => e.c))
    let maxCol = Math.max(...Object.values(elves).map(e => e.c))
    for (let r = minRow; r <= maxRow; r++) {
        let line = ''
        for (let c = minCol; c <= maxCol; c++) {
            if (elves[getLocStr(r, c)]) {
                line += '#'
            } else {
                line += '.'
            }
        }
        str.push(line)
    }
    console.log(str.join('\n'))
}

const scoreElves = (elves: Elves): number => {
    let minRow = Math.min(...Object.values(elves).map(e => e.r))
    let maxRow = Math.max(...Object.values(elves).map(e => e.r))
    let minCol = Math.min(...Object.values(elves).map(e => e.c))
    let maxCol = Math.max(...Object.values(elves).map(e => e.c))

    return (maxRow - minRow + 1) * (maxCol - minCol + 1) - Object.keys(elves).length
}

export {
    parseInput,
    processRounds,
    printElves,
    scoreElves,
}
