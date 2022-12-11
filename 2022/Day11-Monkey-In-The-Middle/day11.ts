type Item = {
  worry: number;
};

type Monkey = {
  items: Item[];
  count: number;
  operation: (arg0: Item) => void;
  test: (arg0: Item, arg1: Monkey[]) => void;
  bigMod: number;
};

const parseInput = (str: string): Monkey[] => {
  let bigMod = 1;
  let result: Monkey[] = [];
  str.split("\n\n").forEach((block) => {
    let arr = block.split("\n");
    let items: Item[] = arr[1]
      .split(":")[1]
      .split(", ")
      .map((v) => {
        return {
          worry: Number(v),
        };
      });
    let operation: (arg0: Item) => void;
    let opLine = arr[2].trim().split(" ");
    if (opLine[4] === "+") {
      if (opLine[5] === "old") {
        operation = (old: Item): void => {
          old.worry += old.worry;
        };
      } else {
        operation = (old: Item): void => {
          old.worry += Number(opLine[5]);
        };
      }
    } else {
      if (opLine[5] === "old") {
        operation = (old: Item): void => {
          old.worry *= old.worry;
        };
      } else {
        operation = (old: Item): void => {
          old.worry *= Number(opLine[5]);
        };
      }
    }
    bigMod *= Number(arr[3].trim().split(" ")[3]);
    let test = (item: Item, monkeys: Monkey[]) => {
      let testNum = Number(arr[3].trim().split(" ")[3]);
      if (item.worry % testNum === 0) {
        monkeys[Number(arr[4].trim().split(" ")[5])].items.push(item);
      } else {
        monkeys[Number(arr[5].trim().split(" ")[5])].items.push(item);
      }
    };

    result.push({ bigMod, items, count: 0, operation, test });
  });

  result.forEach((m) => (m.bigMod = bigMod));
  return result;
};

const processRound = (monkeys: Monkey[], part1: boolean): void => {
  monkeys.forEach((monkey) => {
    while (monkey.items.length > 0) {
      monkey.count += 1;
      let current = monkey.items.shift();
      monkey.operation(current);
      if (part1) {
        current.worry = Math.floor(current.worry / 3);
      } else {
        current.worry = current.worry % monkey.bigMod;
      }
      monkey.test(current, monkeys);
    }
  });
};

const processRounds = (
  monkeys: Monkey[],
  rounds: Number,
  part1 = true
): number => {
  for (let i = 0; i < rounds; i++) {
    processRound(monkeys, part1);
  }
  return monkeys
    .map((m) => m.count)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((prod, ele) => prod * ele, 1);
};

export { parseInput, processRound, processRounds };
