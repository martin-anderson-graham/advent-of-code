class RNode {
    value: number;
    next: RNode | null;
    previous: RNode | null;

    constructor(initialValue: number) {
        this.value = initialValue
        this.next = null
        this.previous = null;
    }
}

class DLL {
    head: RNode;
    tail: RNode;
    length: number;
    zeroNode: RNode | null;

    constructor(initialValue: number) {
        this.head = new RNode(initialValue)
        this.tail = this.head
        this.length = 1
        this.zeroNode = null
    }

    enqueue(value: number) {
        let newNode = new RNode(value)
        this.tail.next = newNode
        newNode.previous = this.tail
        this.tail = newNode
        this.length += 1
        if (value === 0) {
            this.zeroNode = newNode
        }
    }

    print() {
        let str: number[] = []
        let currentNode: RNode | null = this.head
        while (currentNode !== null) {
            str.push(currentNode.value)
            currentNode = currentNode.next
        }
        console.log(str.join(' => '))
    }

    reversePrint() {
        let str: number[] = []
        let currentNode: RNode | null = this.tail
        while (currentNode !== null) {
            str.push(currentNode.value)
            currentNode = currentNode.previous
        }
        console.log(str.join(' => '))
    }
    getRNodeArray(): RNode[] {
        let r: RNode[] = []
        let currentNode: RNode | null = this.head
        while (currentNode !== null) {
            r.push(currentNode)
            currentNode = currentNode.next
        }
        return r
    }

    moveNode(node: RNode) {
        let negative = node.value < 0
        let moveAmount = Math.abs(node.value) % (this.length - 1)
        // let moveAmount = Math.abs(node.value)
        for (let i = 0; i < moveAmount; i++) {
            if (negative) {
                if (node === this.head) {
                    if (node.next === null) {
                        throw new Error("Something has gone wrong")
                    }
                    this.head = node.next
                    this.head.previous = null
                    this.tail.next = node
                    node.previous = this.tail
                    node.next = null
                    this.tail = node
                }
                let prev = node.previous
                let next = node.next
                if (prev === null) {
                    throw new Error("Something went wrong")
                }
                let prevprev = prev.previous
                prev.previous = node
                node.next = prev
                node.previous = prevprev
                prev.next = next
                if (next === null) {
                    this.tail = prev
                } else {
                    next.previous = prev
                }
                if (prevprev === null) {
                    this.head = node
                } else {
                    prevprev.next = node
                }
            } else {
                if (node === this.tail) {
                    if (node.previous === null) {
                        throw new Error("Something has gone wrong")
                    }
                    this.tail = node.previous
                    this.tail.next = null
                    node.next = this.head
                    this.head.previous = node
                    this.head = node
                    node.previous = null
                }

                let prev = node.previous
                let next = node.next
                if (next === null) {
                    throw new Error("Something went wrong")
                }
                let nextnext = next.next

                node.next = nextnext
                node.previous = next
                next.next = node
                next.previous = prev
                if (prev === null) {
                    this.head = next
                } else {
                    prev.next = next
                }
                if (nextnext === null) {
                    this.tail = node
                } else {
                    nextnext.previous = node
                }
            }
        }
    }

    score(): number {
        let score = 0
        let currentNode = this.zeroNode
        if (currentNode === null) {
            throw new Error("Apparently there is no zero node?")
        }
        for (let i = 1; i <= 3000; i++) {
            currentNode = currentNode.next
            if (currentNode === null) {
                currentNode = this.head
            }
            if (i === 1000 || i === 2000 || i === 3000) {
                score += currentNode.value
            }
        }
        return score
    }

    performMixing(times: number = 1): void {
        let originalNodeOrder = this.getRNodeArray()
        for (let i = 0; i < times; i++) {
            originalNodeOrder.forEach(node => {
                this.moveNode(node)
            })
        }
    }

    applyDecriptionKey(key: number) {
        let currentNode: RNode | null = this.head
        while (currentNode !== null) {
            currentNode.value *= key
            currentNode = currentNode.next
        }

        this.performMixing(10)
    }
}


const parseInput = (str: string): DLL => {
    let arr = str.split('\n').map(v => Number(v))
    let q = new DLL(arr[0])
    for (let i = 1; i < arr.length; i++) {
        q.enqueue(arr[i])
    }

    return q
}

export {
    parseInput,
    DLL,
}
