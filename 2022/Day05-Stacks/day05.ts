type Rule = {
  num: number;
  from: number;
  to: number;
};

class StackNode {
  value: string;
  next: StackNode | null;

  constructor(val: string, next: StackNode | null) {
    this.value = val;
    this.next = next;
  }
}

class Stack {
  top: StackNode | null;

  constructor() {
    this.top = null;
  }

  push(val: string): void {
    this.top = new StackNode(val, this.top);
  }

  pop(): string {
    if (this.top === null) {
      throw new Error("Tried to pop an empty stack");
    }
    let val = this.top.value;
    this.top = this.top.next;
    return val;
  }

  popN(n: number): string[] {
    let result: string[] = [];
    for (let i = 0; i < n; i += 1) {
      result.push(this.pop());
    }
    return result;
  }

  printStackBottomUp(): void {
    let res: string[] = [];
    let current = this.top;
    while (current !== null) {
      res.push(current.value);
      current = current.next;
    }
  }
}

const parseInput = (str: string): [Stack[], Rule[]] => {
  let [stackString, rulesString] = str.split("\n\n");
  let stacks: Stack[] = [];
  let stackArr = stackString.split("\n").slice(0, -1).reverse();
  let rowLength = stackArr[0].length;
  stackArr.forEach((row) => {
    let i = 1;
    let count = 0;
    while (i < rowLength) {
      if (!stacks[count]) {
        stacks.push(new Stack());
      }
      if (row.charAt(i) !== " ") {
        stacks[count].push(row.charAt(i));
      }
      i += 4;
      count += 1;
    }
  });
  let rules = rulesString.split("\n").map((row) => {
    let vals = row.split(" ");
    return {
      num: Number(vals[1]),
      from: Number(vals[3]) - 1,
      to: Number(vals[5]) - 1,
    };
  });
  stacks.forEach((s) => s.printStackBottomUp());
  return [stacks, rules];
};

const part1 = (str: string): string => {
  let [stacks, rules] = parseInput(str);
  rules.forEach((rule) => {
    for (let i = 0; i < rule.num; i += 1) {
      stacks[rule.to].push(stacks[rule.from].pop());
    }
  });

  return stacks
    .map((s) => {
      if (s.top === null) {
        return "";
      }
      return s.top.value;
    })
    .join("");
};

const part2 = (str: string): string => {
  let [stacks, rules] = parseInput(str);
  rules.forEach((rule) => {
    let temp = stacks[rule.from].popN(rule.num);
    temp.reverse().forEach((c) => stacks[rule.to].push(c));
  });

  return stacks
    .map((s) => {
      if (s.top === null) {
        return "";
      }
      return s.top.value;
    })
    .join("");
};

export { part1, part2 };
