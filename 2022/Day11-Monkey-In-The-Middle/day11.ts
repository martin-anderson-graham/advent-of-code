type Item = {
  worry: number;
};

type Monkey = {
  items: Item[];
  // operation: (arg0: number) => number;
  // test: (arg0: number) => void;
};

const parseInput = (str: string): Monkey[] => {
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

    result.push({ items });
  });
  return result;
};

export { parseInput };
