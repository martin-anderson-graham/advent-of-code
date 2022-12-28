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
    for (let i = startingIndex + 1; i < monkeyOrder.length; i++) {
        let monkey = monkeyOrder[i]

        if (monkey.op === undefined || monkey.first === undefined || monkey.second === undefined) {
            continue
        }
        let firstValue = knownMonkeys[monkey.first].value
        let secondValue = knownMonkeys[monkey.second].value

        if (firstValue === undefined || secondValue === undefined) {
            throw new Error("This should not happen")
        }
        if (monkey.name === 'root') {
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
            if (!Number.isInteger(monkey.value)) {
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

const processAllPreHumanMonkeys = (knownMonkeys: Record<string, Monkey>, monkeyOrder: Monkey[], startingIndex: number): void => {
    let cont = true
    while (cont) {
        cont = false
        for (let i = startingIndex + 1; i < monkeyOrder.length; i++) {
            let m = monkeyOrder[i]
            if (m.value === undefined) {
                let first = knownMonkeys[m.first]?.value
                let second = knownMonkeys[m.second]?.value
                if (first !== undefined && second !== undefined) {
                    cont = true
                    if (m.op === '+') {
                        m.value = first + second
                        knownMonkeys[m.name] = m
                    } else if (m.op === '-') {
                        m.value = first - second
                        knownMonkeys[m.name] = m
                    } else if (m.op === '/') {
                        m.value = first / second
                        knownMonkeys[m.name] = m
                    } else if (m.op === '*') {
                        m.value = first * second
                        knownMonkeys[m.name] = m
                    }
                }
            }
        }
    }
}

const backwardsProcessMonkeys = (knownMonkeys: Record<string, Monkey>, monkeyOrder: Monkey[]): void => {
    let cont = true
    while (cont) {
        cont = false
        for (let i = 0; i < monkeyOrder.length; i++) {
            let m = monkeyOrder[i]
            if (m.value === undefined) {
                continue
            }
            //to catch hardcoded values
            if (m.op === undefined) {
                continue
            }
            let first = knownMonkeys[m.first]?.value
            let second = knownMonkeys[m.second]?.value
            //already finished ones
            if (first !== undefined && second !== undefined) {
                continue
            }
            cont = true
            if (first === undefined) {
                let newFirst = 0
                if (m.op === '+') {
                    newFirst = m.value - second
                } else if (m.op === '-') {
                    newFirst = m.value + second
                } else if (m.op === '/') {
                    newFirst = m.value * second
                } else if (m.op === '*') {
                    newFirst = m.value / second
                }

                knownMonkeys[m.first] = monkeyOrder.find(mn => mn.name === m.first)
                knownMonkeys[m.first].value = newFirst
            } else {
                let newSecond = 0
                if (m.op === '+') {
                    newSecond = m.value - first
                } else if (m.op === '-') {
                    newSecond = first - m.value
                } else if (m.op === '/') {
                    newSecond = first / m.value
                } else if (m.op === '*') {
                    newSecond = m.value / first
                }

                knownMonkeys[m.second] = monkeyOrder.find(mn => mn.name === m.second)
                knownMonkeys[m.second].value = newSecond


            }
        }
    }
}
//to sort all undefined values to the end in order
const sortMonkeyOrder = (monkeys: Monkey[]) => {
    monkeys.sort((a, b): number => {
        if (a.value !== undefined && b.value === undefined) {
            return -1
        } else if (a.value === undefined && b.value !== undefined) {
            return 1
        } else if (a.value === undefined && b.value === undefined) {
            return 0
        } else if (a.value !== undefined && b.value !== undefined) {
            return 0
        }
        return 0
    })
}

const findRootValue = (monkeys: Monkey[]): number => {
    let [knownMonkeys, monkeyOrder] = createMonkeyQueue(monkeys)
    processMonkeyOrder(knownMonkeys, monkeyOrder)
    return knownMonkeys.root.value || -1
}

const findYourValue = (monkeys: Monkey[]): number => {
    let [knownMonkeys, monkeyOrder] = createMonkeyQueue(monkeys)
    let humnIndex = processMonkeysUpToHumn(knownMonkeys, monkeyOrder)
    knownMonkeys.humn.value = undefined
    processAllPreHumanMonkeys(knownMonkeys, monkeyOrder, humnIndex)
    sortMonkeyOrder(monkeyOrder)
    while (monkeyOrder[humnIndex + 1]?.value !== undefined) {
        monkeyOrder = monkeyOrder.slice(0, humnIndex).concat(monkeyOrder[humnIndex + 1], monkeyOrder[humnIndex], ...monkeyOrder.slice(humnIndex + 2))
        humnIndex += 1
    }
    // knownMonkeys.humn.value = 0
    // while (searching(knownMonkeys, monkeyOrder, humnIndex)) {
    //     knownMonkeys.humn.value += 1
    // }

    let rootMonkey = monkeyOrder.find(m => m.name === 'root') as Monkey

    knownMonkeys[rootMonkey.first] = monkeyOrder.find(m => m.name === rootMonkey.first)
    knownMonkeys[rootMonkey.first].value = monkeyOrder.find(m => m.name === rootMonkey.second).value

    backwardsProcessMonkeys(knownMonkeys, monkeyOrder)

    let str: string[] = []
    for (let i = 0; i < monkeyOrder.length; i++) {
        let m = monkeyOrder[i]
        if (m.name === 'humn') {
            str.push(`${m.name}: ${m.value}<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
        } else {
            str.push(`${m.name}: ${m.value}`)
        }
    }
    // console.log(str.join('\n'))
    let str2: string[] = []
    for (let i = humnIndex + 1; i < monkeyOrder.length; i++) {
        let m = monkeyOrder[i]
        let first = knownMonkeys[m.first]?.value || m.first
        let second = knownMonkeys[m.second]?.value || m.second
        str2.push(`${m.name}: ${first} ${m.op} ${second}`)

    }
    // console.log(str2.join('\n'))
    return knownMonkeys.humn.value || -1
}


export {
    parseInput,
    findRootValue,
    findYourValue
}
