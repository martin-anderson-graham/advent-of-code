class QNode {
  name: string;
  value: number;
  next: QNode | null;

  constructor(name: string, value: number, next: QNode | null) {
    this.name = name;
    this.value = value;
    this.next = next;
  }
}

class Queue {
  head: QNode | null;
  tail: QNode | null;
  constructor() {
    this.head = null;
    this.tail = this.head;
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  enqueue(name: string, value: number) {
    if (this.head === null) {
      this.head = new QNode(name, value, null);
      this.tail = this.head;
    } else {
      if (this.tail !== null) {
        this.tail.next = new QNode(name, value, null);
        this.tail = this.tail.next;
      }
    }
  }

  dequeue(): QNode {
    if (this.head !== null) {
      let result = this.head;
      this.head = this.head.next;
      return result;
    } else {
      throw new Error("head in null");
    }
  }

  reset(name: string, value: number): void {
    this.head = new QNode(name, value, null);
    this.tail = this.head;
  }

  printQueue(): void {
    let res: string[] = [];
    let current = this.head;
    while (current !== null) {
      res.push(current.name);
      current = current.next;
    }
    console.log(res.join("->"));
  }
}

export { Queue };
