interface Monkey {
    name: string;
    value: number | undefined;
    first: string | undefined;
    second: string | undefined;
    op: string | undefined;
}

const parseInput = (str: string): Monkey[] => {
    let result: Monkey[] = []
    str.split('\n').forEach(l => {
        let arr = l.replace(":", "").split(' ')
        let monkey: Monkey = {
            name: arr[0],
            value: undefined,
            first: undefined,
            second: undefined,
            op: undefined
        }
        if (Number.isInteger(Number(arr[1]))) {
            monkey.value = Number(arr[1])
        } else {
            monkey.first = arr[1]
            monkey.op = arr[2]
            monkey.second = arr[3]
        }
        result.push(monkey)
    })
    return result
}

class MonkeyNode {
    value: Monkey;
    next: MonkeyNode | null;
    previous: MonkeyNode | null

    constructor(value: Monkey) {
        this.value = value
        this.next = null
        this.previous = null
    }
}

class MonkeyQueue {
    head: MonkeyNode | null
    tail: MonkeyNode | null

    constructor() {
        this.head = null
        this.tail = null
    }

    enqueue(value: Monkey) {
        let newNode = new MonkeyNode(value)
        if (this.head === null) {
            this.head = newNode
            this.tail = newNode
            newNode.previous = null
        } else if (this.tail !== null) {
            this.tail.next = newNode
            newNode.previous = this.tail
            this.tail = newNode
        } else {
            throw new Error("This shouldn't ever happen")
        }
    }

    isEmpty(): boolean {
        return this.head === null
    }

    removeMonkeyNode(mNode: MonkeyNode) {
        let prev = mNode.previous
        let next = mNode.next
        if (prev === null) {
            if (next === null) {
                this.head = null
                this.tail = null
            } else {
                this.head = next
                this.head.previous = null
            }
        } else if (next === null) {
            this.tail = prev
            this.tail.next = null
        } else {
            prev.next = next
            next.previous = prev
        }
    }
}

const processMonkeyOrder = (knownMonkeys: Record<string, Monkey>, monkeyOrder: Monkey[]): void => {
    for (let i = 0; i < monkeyOrder.length; i++) {
        let monkey = monkeyOrder[i]
        if (knownMonkeys[monkey.name].value !== undefined) {
            continue
        }

        if (monkey.op === undefined || monkey.first === undefined || monkey.second === undefined) {
            throw new Error("This should not happen")
        }
        let firstValue = knownMonkeys[monkey.first].value
        let secondValue = knownMonkeys[monkey.second].value

        if (firstValue === undefined || secondValue === undefined) {
            throw new Error("This should not happen")
        }

        if (monkey.op === '+') {
            monkey.value = firstValue + secondValue
            knownMonkeys[monkey.name] = monkey
        } else if (monkey.op === '-') {
            monkey.value = firstValue - secondValue
            knownMonkeys[monkey.name] = monkey
        } else if (monkey.op === '/') {
            monkey.value = firstValue / secondValue
            knownMonkeys[monkey.name] = monkey
        } else if (monkey.op === '*') {
            monkey.value = firstValue * secondValue
            knownMonkeys[monkey.name] = monkey
        }
    }
}

const createMonkeyQueue = (monkeys: Monkey[]): [Record<string, Monkey>, Monkey[]] => {
    const knownMonkeys: Record<string, Monkey> = {}
    const monkeyOrder: Monkey[] = []
    const q = new MonkeyQueue()

    monkeys.forEach(monkey => {
        if (monkey.value !== undefined) {
            knownMonkeys[monkey.name] = monkey
            monkeyOrder.push(monkey)
        } else {
            q.enqueue(monkey)
        }
    })

    //
    while (!q.isEmpty()) {
        let currentNode: MonkeyNode | null = q.head
        while (currentNode !== null) {
            let first = currentNode.value.first
            let second = currentNode.value.second
            if (first === undefined || second === undefined) {
                throw new Error("This shouldn't happen")
            }
            if (knownMonkeys[first] && knownMonkeys[second]) {
                q.removeMonkeyNode(currentNode)
                knownMonkeys[currentNode.value.name] = currentNode.value
                monkeyOrder.push(currentNode.value)
            }
            currentNode = currentNode.next
        }
    }

    return [knownMonkeys, monkeyOrder]
}

const processMonkeysUpToHumn = (knownMonkeys: Record<string, Monkey>, monkeyOrder: Monkey[]): number => {
    for (let i = 0; i < monkeyOrder.length; i++) {
        let monkey = monkeyOrder[i]
        if (monkey.name === 'humn') {
            return i
        }
        if (knownMonkeys[monkey.name].value !== undefined) {
            continue
        }

        if (monkey.op === undefined || monkey.first === undefined || monkey.second === undefined) {
            throw new Error("This should not happen")
        }
        let firstValue = knownMonkeys[monkey.first].value
        let secondValue = knownMonkeys[monkey.second].value

        if (firstValue === undefined || secondValue === undefined) {
            throw new Error("This should not happen")
        }

        if (monkey.op === '+') {
            monkey.value = firstValue + secondValue
            knownMonkeys[monkey.name] = monkey
        } else if (monkey.op === '-') {
            monkey.value = firstValue - secondValue
            knownMonkeys[monkey.name] = monkey
        } else if (monkey.op === '/') {
            monkey.value = firstValue / secondValue
            knownMonkeys[monkey.name] = monkey
        } else if (monkey.op === '*') {
            monkey.value = firstValue * secondValue
            knownMonkeys[monkey.name] = monkey
        }
    }
    return -1
}

const searching = (knownMonkeys: Record<string, Monkey>, monkeyOrder: Monkey[], startingIndex: number): boolean => {
    for (let i = startingIndex+1; i < monkeyOrder.length; i++) {
        let monkey = monkeyOrder[i]
        
        if (monkey.op === undefined || monkey.first === undefined || monkey.second === undefined) {
            continue
        }
        let firstValue = knownMonkeys[monkey.first].value
        let secondValue = knownMonkeys[monkey.second].value

        if (firstValue === undefined || secondValue === undefined) {
            throw new Error("This should not happen")
        }
        if(monkey.name === 'root') {
            return firstValue !== secondValue
        }

        if (monkey.op === '+') {
            monkey.value = firstValue + secondValue
            knownMonkeys[monkey.name] = monkey
        } else if (monkey.op === '-') {
            monkey.value = firstValue - secondValue
            knownMonkeys[monkey.name] = monkey
        } else if (monkey.op === '/') {
            monkey.value = firstValue / secondValue
            if(!Number.isInteger(firstValue/secondValue)) {
                return true
            }
            knownMonkeys[monkey.name] = monkey
        } else if (monkey.op === '*') {
            monkey.value = firstValue * secondValue
            knownMonkeys[monkey.name] = monkey
        }
    }
    return false
}
const findRootValue = (monkeys: Monkey[]): number => {
    let [knownMonkeys, monkeyOrder] = createMonkeyQueue(monkeys)
    processMonkeyOrder(knownMonkeys, monkeyOrder)
    return knownMonkeys.root.value || -1
}

const findYourValue = (monkeys: Monkey[]): number => {
    let [knownMonkeys, monkeyOrder] = createMonkeyQueue(monkeys)
    let humnIndex = processMonkeysUpToHumn(knownMonkeys, monkeyOrder)
    knownMonkeys.humn.value = 0
    while (searching(knownMonkeys, monkeyOrder, humnIndex)) {
        knownMonkeys.humn.value += 1
    }
    return knownMonkeys.humn.value || -1
}


export {
    parseInput,
    findRootValue,
    findYourValue
}
