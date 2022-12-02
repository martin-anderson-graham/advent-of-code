type Job = {
  action: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

const parseInput = (str: string): Job[] => {
  return str.split("\n").map((line) => {
    let lineArr = line.split(" ");
    if (lineArr[0] === "toggle") {
      let first = lineArr[1].split(",").map((e) => Number(e));
      let second = lineArr[3].split(",").map((e) => Number(e));
      return {
        action: "toggle",
        startX: first[0],
        startY: first[1],
        endX: second[0],
        endY: second[1],
      };
    } else {
      let first = lineArr[2].split(",").map((e) => Number(e));
      let second = lineArr[4].split(",").map((e) => Number(e));
      return {
        action: lineArr[1],
        startX: first[0],
        startY: first[1],
        endX: second[0],
        endY: second[1],
      };
    }
  });
};

const makeKey = (x: number, y: number): string => String(x) + "," + String(y);

const countArr = (obj: Record<string, boolean>): number => {
  return Object.values(obj).filter((e) => e).length;
};

const countAfterJobs = (jobArr: Job[]): number => {
  let result: Record<string, boolean> = {};
  jobArr.forEach((job) => {
    for (let x = job.startX; x <= job.endX; x += 1) {
      for (let y = job.startY; y <= job.endY; y += 1) {
        let key = makeKey(x, y);
        if (job.action === "toggle") {
          result[key] = result[key] ? !result[key] : true;
        } else {
          if (result[key]) {
            result[key] = job.action === "on";
          } else {
            if (job.action === "on") {
              result[key] = true;
            }
          }
        }
      }
    }
  });
  return countArr(result);
};

const countBrightness = (obj: Record<string, number>): number => {
  return Object.values(obj).reduce((sum, ele) => sum + ele, 0);
};

const brightness = (jobArr: Job[]): number => {
  let result: Record<string, number> = {};
  jobArr.forEach((job) => {
    for (let x = job.startX; x <= job.endX; x += 1) {
      for (let y = job.startY; y <= job.endY; y += 1) {
        let key = makeKey(x, y);
        if (job.action === "toggle") {
          result[key] = result[key] ? result[key] + 2 : 2;
        } else {
          let change = job.action === "on" ? 1 : -1;
          result[key] = result[key] ? result[key] + change : change;
          if (result[key] < 0) {
            result[key] = 0;
          }
        }
      }
    }
  });
  return countBrightness(result);
};

export { parseInput, countAfterJobs, brightness };
