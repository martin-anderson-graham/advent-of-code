type Reindeer = {
  name: string;
  speed: number;
  speedTime: number;
  restTime: number;
  isRunning: boolean;
  countDown: number;
  score: number;
  position: 0;
};

const parseInput = (str: string): Reindeer[] => {
  return str.split("\n").map((r) => {
    let arr = r.split(" ");
    return {
      name: arr[0],
      speed: Number(arr[3]),
      speedTime: Number(arr[6]),
      restTime: Number(arr[13]),
      position: 0,
      isRunning: true,
      countDown: Number(arr[6]),
      score: 0,
    };
  });
};

const race = (str: string, time: number): number => {
  let reindeer = parseInput(str);
  for (let i = 0; i < time; i += 1) {
    reindeer.forEach((r) => {
      if (r.isRunning) {
        r.position += r.speed;
      }
      r.countDown -= 1;
      if (r.countDown === 0) {
        if (r.isRunning) {
          r.isRunning = false;
          r.countDown = r.restTime;
        } else {
          r.isRunning = true;
          r.countDown = r.speedTime;
        }
      }
    });
  }
  return Math.max(...reindeer.map((r) => r.position));
};

const updateScores = (arr: Reindeer[]): void => {
  let max = -Infinity;
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].position > max) {
      max = arr[i].position;
    }
  }
  arr.filter((r) => r.position === max).forEach((r) => (r.score += 1));
};

const race2 = (str: string, time: number): number => {
  let reindeer = parseInput(str);
  for (let i = 0; i < time; i += 1) {
    reindeer.forEach((r) => {
      if (r.isRunning) {
        r.position += r.speed;
      }
      r.countDown -= 1;
      if (r.countDown === 0) {
        if (r.isRunning) {
          r.isRunning = false;
          r.countDown = r.restTime;
        } else {
          r.isRunning = true;
          r.countDown = r.speedTime;
        }
      }
    });
    updateScores(reindeer);
  }
  return Math.max(...reindeer.map((r) => r.score));
};
export { parseInput, race, race2 };
