const parseInput = (str: string): number[][] => {
  return str.split("\n").reduce(
    (r: number[][], ele) => {
      if (ele === "") {
        r.push([]);
      } else {
        r[r.length - 1].push(Number(ele));
      }
      return r;
    },
    [[]]
  );
};

const part1 = (arr: number[][]): number => {
  return Math.max(
    ...arr.map((elf) => {
      return elf.reduce((sum, e) => {
        sum += e;
        return sum;
      }, 0);
    })
  );
};

const part2 = (arr: number[][]): number => {
  return arr
    .map((elf) => {
      return elf.reduce((sum, e) => {
        sum += e;
        return sum;
      }, 0);
    })
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, ele) => {
      sum += ele;
      return sum;
    }, 0);
};
export { parseInput, part1, part2 };
