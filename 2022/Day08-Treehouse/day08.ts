const parseInput = (str: string): number[][] => {
  return str.split("\n").map((r) => r.split("").map((v) => Number(v)));
};

const treeIsVisibleCardinal = (
  trees: number[][],
  r: number,
  c: number
): boolean => {
  if (
    r == 0 ||
    r === trees.length - 1 ||
    c === 0 ||
    c === trees[0].length - 1
  ) {
    return true;
  }
  let val = trees[r][c];
  let result = false;

  for (let cc = c - 1; cc >= 0; cc--) {
    if (trees[r][cc] >= val) {
      break;
    }
    if (cc === 0) {
      result = true;
    }
  }

  for (let cc = c + 1; cc < trees[r].length; cc++) {
    if (trees[r][cc] >= val) {
      break;
    }
    if (cc === trees[r].length - 1) {
      result = true;
    }
  }

  for (let cr = r - 1; cr >= 0; cr--) {
    if (trees[cr][c] >= val) {
      break;
    }
    if (cr === 0) {
      result = true;
    }
  }

  for (let cr = r + 1; cr < trees.length; cr++) {
    if (trees[cr][c] >= val) {
      break;
    }
    if (cr === trees.length - 1) {
      result = true;
    }
  }

  return result;
};

const countViewableCardinalTrees = (trees: number[][]): number => {
  let res = trees.map((row, r) => {
    return row.map((_val, c) => {
      return treeIsVisibleCardinal(trees, r, c);
    });
  });
  return res.reduce((sum: number, row) => {
    return sum + row.reduce((s: number, e) => s + Number(e), 0);
  }, 0);
};

const countTreesThatCanBeViewed = (
  trees: number[][],
  r: number,
  c: number
): number => {
  let scoreArr: number[] = [];
  let val = trees[r][c];
  let count = 1;
  for (let cc = c - 1; cc >= 0; cc--) {
    if (cc === 0 || trees[r][cc] >= val) {
      scoreArr.push(count);
      break;
    } else {
      count++;
    }
  }

  count = 1;
  for (let cc = c + 1; cc < trees[r].length; cc++) {
    if (cc === trees[r].length - 1 || trees[r][cc] >= val) {
      scoreArr.push(count);
      break;
    } else {
      count++;
    }
  }

  count = 1;
  for (let cr = r - 1; cr >= 0; cr--) {
    if (cr === 0 || trees[cr][c] >= val) {
      scoreArr.push(count);
      break;
    } else {
      count++;
    }
  }

  count = 1;
  for (let cr = r + 1; cr < trees.length; cr++) {
    if (cr === trees.length - 1 || trees[cr][c] >= val) {
      scoreArr.push(count);
      break;
    } else {
      count++;
    }
  }
  console.log(r, "-", c, "  ", scoreArr);
  return scoreArr.reduce((prod, ele) => prod * ele, 1);
};

const findBestTreeView = (trees: number[][]): number => {
  let max = -Infinity;
  trees.forEach((row, r) => {
    row.forEach((_col, c) => {
      let score = countTreesThatCanBeViewed(trees, r, c);
      if (score > max) {
        max = score;
      }
    });
  });
  return max;
};

export { parseInput, countViewableCardinalTrees, findBestTreeView };
