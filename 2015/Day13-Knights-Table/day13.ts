type Prefs = Record<string, Record<string, number>>;

const parseInput = (str: string): Prefs => {
  let rowArr = str.split("\n");
  let res: Prefs = {};
  for (let i = 0; i < rowArr.length; i++) {
    let arr: string[] = rowArr[i].split(" ");
    if (!res[arr[0]]) {
      res[arr[0]] = {};
    }
    if (arr[2] === "gain") {
      res[arr[0]][arr[10].slice(0, -1)] = Number(arr[3]);
    } else if (arr[2] === "lose") {
      res[arr[0]][arr[10].slice(0, -1)] = -1 * Number(arr[3]);
    }
  }
  return res;
};

const score = (people: string[], prefs: Prefs): number => {
  let sum = 0;
  for (let i = 0; i < people.length; i++) {
    let person = people[i];
    let next: string;
    let prior: string;
    if (i < people.length - 1) {
      next = people[i + 1];
    } else {
      next = people[0];
    }
    sum += prefs[person][next];

    if (i >= 1) {
      prior = people[i - 1];
    } else {
      prior = people[people.length - 1];
    }
    sum += prefs[person][prior];
  }
  return sum;
};

const findBest = (str: string, seatYourself: boolean = false): number => {
  let max = -Infinity;
  let prefs = parseInput(str);
  let allPeople = Object.keys(prefs);
  if (seatYourself) {
    prefs["you"] = allPeople.reduce(
      (obj: Record<string, number>, ele: string) => {
        obj[ele] = 0;
        return obj;
      },
      {} as Record<string, number>
    );

    allPeople.forEach((p) => {
      prefs[p]["you"] = 0;
    });
    allPeople.push("you");
  }
  const backtrack = (candidate: string[]): void => {
    if (candidate.length === allPeople.length) {
      let scr = score(candidate, prefs);
      if (scr > max) {
        max = scr;
      }
      return;
    } else {
      let remaining = allPeople.filter((p) => !candidate.includes(p));
      remaining.forEach((r) => {
        let newCandidate = candidate.slice();
        newCandidate.push(r);
        backtrack(newCandidate);
      });
    }
  };

  backtrack([] as string[]);
  return max;
};

export { parseInput, findBest, score };
