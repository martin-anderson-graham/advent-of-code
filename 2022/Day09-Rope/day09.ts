type Move = {
  direction: string;
  value: number;
};
const parseInput = (str: string): Move[] => {
  return str.split("\n").map((row) => {
    let arr = row.split(" ");
    return {
      direction: arr[0],
      value: Number(arr[1]),
    };
  });
};

type Knot = {
  x: number;
  y: number;
  next: Knot;
};
class Rope {
  head: Knot;
  tailVisited: Record<string, boolean>;
  dirMappings: Record<string, Record<string, number>>;

  constructor(numKnots: number) {
    this.head = { x: 0, y: 0, next: null };
    let current = this.head;
    for (let i = 1; i < numKnots; i += 1) {
      current.next = { x: 0, y: 0, next: null };
      current = current.next;
    }

    this.tailVisited = {};

    this.dirMappings = {
      R: { x: 1, y: 0 },
      L: { x: -1, y: 0 },
      U: { x: 0, y: 1 },
      D: { x: 0, y: -1 },
    };
  }

  moveHead(move: Move): void {
    for (let i = 0; i < move.value; i += 1) {
      this.head.x += this.dirMappings[move.direction].x;
      this.head.y += this.dirMappings[move.direction].y;
      this.updateTails();
    }
  }

  updateTails(): void {
    let prior = this.head;
    let current = prior.next;
    while (current !== null) {
      let inRange =
        Math.abs(prior.x - current.x) <= 1 &&
        Math.abs(prior.y - current.y) <= 1;
      if (!inRange) {
        if (prior.y > current.y) {
          current.y = current.y + 1;
        } else if (prior.y < current.y) {
          current.y = current.y - 1;
        }

        if (prior.x > current.x) {
          current.x = current.x + 1;
        } else if (prior.x < current.x) {
          current.x = current.x - 1;
        }
      }
      prior = current;
      current = current.next;
    }
    this.tailVisited[`${prior.x},${prior.y}`] = true;
  }

  countVisited(): number {
    return Object.keys(this.tailVisited).length;
  }
}

const processMoves = (moves: Move[], numKnots: number): number => {
  let rope = new Rope(numKnots);

  moves.forEach((move) => {
    rope.moveHead(move);
  });

  return rope.countVisited();
};

export { processMoves, parseInput };
