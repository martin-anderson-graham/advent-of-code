const parseInput = (str: string): number[][] => {
  return str.split("\n").map((r) => r.split(/[-,]/).map((n) => Number(n)));
};

const isOverlapping = (arr: number[]): boolean => {
  if (arr[0] <= arr[2] && arr[1] >= arr[3]) {
    return true;
  }
  if (arr[2] <= arr[0] && arr[3] >= arr[1]) {
    return true;
  }
  return false;
};

const countOverlapping = (arr: number[][]): number => {
  return arr.reduce((sum: number, group) => {
    return isOverlapping(group) ? sum + 1 : sum;
  }, 0);
};

const isPartiallyOverlapping = (arr: number[]): boolean => {
  if (arr[0] >= arr[2] && arr[0] <= arr[3]) {
    return true;
  }
  if (arr[1] >= arr[2] && arr[1] <= arr[3]) {
    return true;
  }
  if (arr[2] >= arr[0] && arr[2] <= arr[1]) {
    return true;
  }
  return false;
};

const countPartialOverlapping = (arr: number[][]): number => {
  return arr.reduce((sum: number, group) => {
    return isPartiallyOverlapping(group) ? sum + 1 : sum;
  }, 0);
};
export { parseInput, countOverlapping, countPartialOverlapping };
