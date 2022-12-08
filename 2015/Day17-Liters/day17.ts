const parseInput = (str: string): number[] => {
  return str.split("\n").map((e) => Number(e));
};
const part1 = (vals: number[], target: number): number => {
  let count = 0;

  const scoreCandidate = (candidate: number[]): number => {
    return candidate.reduce((sum, ele) => sum + ele, 0);
  };

  const backTrack = (candidate: number[], remaining: number[]): void => {
    let currentScore = scoreCandidate(candidate);
    if (currentScore === target) {
      count++;
      return;
    } else if (currentScore > target) {
      return;
    } else {
      for (let i = 0; i < remaining.length; i++) {
        let newRemaining = remaining.slice(i + 1);
        candidate.push(remaining[i]);
        backTrack(candidate, newRemaining);
        candidate.pop();
      }
    }
  };

  backTrack([], vals);
  return count;
};

const part2 = (vals: number[], target: number): number => {
  const scoreCandidate = (candidate: number[]): number => {
    return candidate.reduce((sum, ele) => sum + ele, 0);
  };

  let results: Record<number, number> = {};

  const backTrack = (candidate: number[], remaining: number[]): void => {
    let currentScore = scoreCandidate(candidate);
    if (currentScore === target) {
      results[candidate.length] = results[candidate.length] + 1 || 1;
      return;
    } else if (currentScore > target) {
      return;
    } else {
      for (let i = 0; i < remaining.length; i++) {
        let newRemaining = remaining.slice(i + 1);
        candidate.push(remaining[i]);
        backTrack(candidate, newRemaining);
        candidate.pop();
      }
    }
  };

  backTrack([], vals);
  let minNumContainers = Object.keys(results).reduce((min, ele) => {
    if (Number(ele) < min) {
      return Number(ele);
    } else {
      return min;
    }
  }, Infinity);
  return results[minNumContainers];
};
export { part1, parseInput, part2 };
