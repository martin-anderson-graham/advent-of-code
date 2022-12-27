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
        let moveAmount = Math.abs(node.value)
        if (moveAmount >= this.length - 1) {
            moveAmount = moveAmount % (this.length - 1)
        }
        for (let i = 0; i < moveAmount; i++) {
            if (negative) {
                if (node === this.head && node.next !== null) {
                    this.head = node.next
                    this.head.previous = null
                    this.tail.next = node
                    node.previous = this.tail
                    this.tail = node
                    this.tail.next = null
                }

                if (node === this.tail && node.previous !== null) {
                    let previous = node.previous
                    if (previous.previous === null) {
                        throw new Error("We have a problem Scottie")
                    }
                    previous.previous.next = node
                    node.previous = previous.previous
                    node.next = previous
                    previous.next = null
                    previous.previous = node
                    this.tail = previous
                } else if (node !== null && node.previous !== null && node.next !== null) {
                    let next = node.next
                    let previous = node.previous
                    node.previous = previous.previous
                    node.next = previous
                    previous.next = next
                    next.previous = previous
                    if (previous.previous === null) {
                        this.head = node
                    } else {
                        previous.previous.next = node
                    }
                    previous.previous = node
                }
            } else {
                if (node === this.tail && node.previous !== null) {
                    this.tail = node.previous
                    this.tail.next = null
                    node.next = this.head
                    this.head = node
                    node.previous = null
                }

                if (node === this.head && node.next !== null) {
                    let next = node.next
                    node.next = next.next
                    node.previous = next
                    this.head = next
                    next.next = node
                    next.previous = null
                } else if (node.next !== null && node.previous !== null) {
                    let prev = node.previous
                    let next = node.next
                    node.next = next.next
                    node.previous = next
                    next.next = node
                    next.previous = prev
                    prev.next = next

                    if (node.next === null) {
                        this.tail = node
                    } else {
                        node.next.previous = node
                    }
                }
            }
        }
    }

    score(): number {
        let score = 0
        let first = 1000 % this.length;
        let currentNode = this.zeroNode
        if (currentNode === null) {
            throw new Error("Apparently there is no zero node")
        }
        for (let i = 0; i < first; i++) {
            currentNode = currentNode.next
            if (currentNode === null) {
                currentNode = this.head
            }
        }
        score += currentNode.value

        let second = 2000 % this.length;
        currentNode = this.zeroNode
        if (currentNode === null) {
            throw new Error("Apparently there is no zero node")
        }
        for (let i = 0; i < second; i++) {
            currentNode = currentNode.next
            if (currentNode === null) {
                currentNode = this.head
            }
        }
        score += currentNode.value

        let third = 3000 % this.length;
        currentNode = this.zeroNode
        if (currentNode === null) {
            throw new Error("Apparently there is no zero node")
        }
        for (let i = 0; i < third; i++) {
            currentNode = currentNode.next
            if (currentNode === null) {
                currentNode = this.head
            }
        }
        score += currentNode.value
        return score
    }

    performMixing(): void {
        let originalNodeOrder = this.getRNodeArray()
        originalNodeOrder.forEach(node => {
            this.moveNode(node)
        })
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
