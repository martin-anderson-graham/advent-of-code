type Direction = 'v' | '^' | '<' | '>'
type Change = { deltaR: number, deltaC: number };
type Loc = { r: number, c: number }

class Tornado {
    r: number;
    c: number;
    change: Change
    direction: string

    constructor(r: number, c: number, dir: Direction) {
        this.r = r
        this.c = c
        this.direction = dir
        if (dir === 'v') {
            this.change = { deltaR: 1, deltaC: 0 }
        } else if (dir === '^') {
            this.change = { deltaR: -1, deltaC: 0 }
        } else if (dir === '<') {
            this.change = { deltaR: 0, deltaC: -1 }
        } else if (dir === '>') {
            this.change = { deltaR: 0, deltaC: 1 }
        }
    }
}

class Grid {
    start: Loc
    end: Loc
    numRows: number;
    numCols: number;
    tornadoRound: number;
    constructor(startR: number, startC: number, endR: number, endC: number, width: number, height: number) {
        this.start = {
            r: startR,
            c: startC
        }
        this.end = {
            r: endR,
            c: endC
        }
        this.numRows = height;
        this.numCols = width;
        this.tornadoRound = 0
    }
}

const parseInput = (str: string): [Tornado[], Grid] => {
    let arr: string[][] = str.split('\n').map(l => l.split(''))
    let height = arr.length
    let width = arr[0].length
    let tornados: Tornado[] = []
    let startC = arr[0].indexOf('.')
    let endC = arr[height - 1].indexOf('.')

    for (let r = 0; r < arr.length; r++) {
        for (let c = 0; c < arr[r].length; c++) {
            let char = arr[r][c]
            if (char === '<' || char === '>' || char === 'v' || char === '^') {
                tornados.push(new Tornado(r, c, char))
            }
        }
    }
    return [tornados, new Grid(0, startC, height - 1, endC, width, height)]

}

class QNode {
    r: number;
    c: number;
    round: number;
    next: QNode | null
    constructor(r: number, c: number, round: number) {
        this.r = r
        this.c = c
        this.round = round
        this.next = null
    }
}

class Queue {
    head: QNode | null;
    tail: QNode | null;
    visitedCount: Record<string, number>
    visited: Record<string, boolean>

    constructor(r: number, c: number, round: number) {
        this.head = new QNode(r, c, round)
        this.tail = this.head
        this.head.next = null
        this.visitedCount = {}
        this.visited = {}
    }

    enqueue(r: number, c: number, round: number) {
        if (this.tail === null) {
            this.head = new QNode(r, c, round)
            this.tail = this.head
        } else {
            this.tail.next = new QNode(r, c, round)
            this.tail = this.tail.next
        }
    }

    dequeue(): QNode {
        if (this.head === null) {
            throw new Error("Nothing to dequeue")
        }
        let node = this.head
        if (this.head.next !== null) {
            this.head = this.head.next
        } else {
            this.head = null
            this.tail = null
        }
        return node
    }

    addAvailableNodes(node: QNode, grid: Grid, tornadoLocationsHash: Record<string, boolean>) {
        //wait
        let loc = getLocString(node.r, node.c)
        if (tornadoLocationsHash[loc] === undefined && !this.visited[loc + ',' + (node.round + 1)]) {
            this.enqueue(node.r, node.c, node.round + 1)
            this.visited[loc + ',' + (node.round + 1)] = true
        }
        //up
        loc = getLocString(node.r - 1, node.c)
        if (node.r - 1 > 0 && tornadoLocationsHash[loc] === undefined && !this.visited[loc + ',' + (node.round + 1)]) {
            this.enqueue(node.r - 1, node.c, node.round + 1)
            this.visited[loc + ',' + (node.round + 1)] = true
        }
        //down
        loc = getLocString(node.r + 1, node.c)
        if (node.r + 1 < grid.numRows - 1 && tornadoLocationsHash[loc] === undefined && !this.visited[loc + ',' + (node.round + 1)]) {
            this.enqueue(node.r + 1, node.c, node.round + 1)
            this.visited[loc + ',' + (node.round + 1)] = true
        }
        //left
        loc = getLocString(node.r, node.c - 1)
        if (node.r !== 0 && node.c - 1 > 0 && tornadoLocationsHash[loc] === undefined && !this.visited[loc + ',' + (node.round + 1)]) {
            this.enqueue(node.r, node.c - 1, node.round + 1)
            this.visited[loc + ',' + (node.round + 1)] = true
        }
        //right
        loc = getLocString(node.r, node.c + 1)
        if (node.r !== 0 && node.c + 1 < grid.numCols - 1 && tornadoLocationsHash[loc] === undefined && !this.visited[loc + ',' + (node.round + 1)]) {
            this.enqueue(node.r, node.c + 1, node.round + 1)
            this.visited[loc + ',' + (node.round + 1)] = true
        }
        //special check for the ending spot
        if (node.c === grid.end.c && node.r === grid.end.r - 1) {
            this.enqueue(node.r + 1, node.c, node.round + 1)
        }
    }

    printQueue() {
        let str: string[] = []
        let current = this.head
        while (current !== null) {
            str.push(`"${current.r},${current.c},${current.round}"`)
            current = current.next
        }
        console.log(str.join(' -> '))
    }
}

const getLocString = (r: number, c: number): string => {
    return `${r},${c}`
}

const printGrid = (grid: Grid, tornados: Tornado[]): void => {
    let arr: string[][] = []

    for (let r = 0; r < grid.numRows; r++) {
        let line: string[] = []
        for (let c = 0; c < grid.numCols; c++) {
            if (r === 0 || r === grid.numRows - 1) {
                line.push('#')
            } else if (c === 0 || c === grid.numCols - 1) {
                line.push('#')
            } else {
                line.push('.')
            }
        }
        arr.push(line)
    }

    arr[grid.start.r][grid.start.c] = '.'
    arr[grid.end.r][grid.end.c] = '.'
    tornados.forEach(t => {
        arr[t.r][t.c] = t.direction
    })
    console.log(arr.map(l => l.join('')).join('\n'))
}

const updateTornados = (grid: Grid, tornados: Tornado[]): Record<string, boolean> => {
    let hash: Record<string, boolean> = {}
    tornados.forEach(t => {
        t.r += t.change.deltaR
        t.c += t.change.deltaC

        if (t.r < 1) {
            t.r = grid.numRows - 2
        } else if (t.r > grid.numRows - 2) {
            t.r = 1
        }
        if (t.c < 1) {
            t.c = grid.numCols - 2
        } else if (t.c > grid.numCols - 2) {
            t.c = 1
        }

        hash[getLocString(t.r, t.c)] = true
    })
    return hash
}

const findSolution = (tornados: Tornado[], grid: Grid, part2 = false): number => {
    let q = new Queue(grid.start.r, grid.start.c, 0)
    let tornadoLocationsHash: Record<string, boolean> = tornados.reduce((obj, t) => {
        obj[getLocString(t.r, t.c)] = true
        return obj
    }, {})

    while (true) {
        // q.printQueue()
        let node = q.dequeue()
        // console.log(node)
        if (node.r === grid.end.r && node.c === grid.end.c) {
            if (part2) {
                break
            } else {
                return node.round
            }
        }
        if (node.round + 1 !== grid.tornadoRound) {
            tornadoLocationsHash = updateTornados(grid, tornados)
            // printGrid(grid, tornados)
            grid.tornadoRound += 1
        }
        q.addAvailableNodes(node, grid, tornadoLocationsHash)
    }
    return -1
}

export {
    parseInput,
    findSolution,
}
