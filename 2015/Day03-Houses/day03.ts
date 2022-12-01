type Log = Record<string, number>;

const numHousesVisited = (str: string): number => {
  let location = { x: 0, y: 0 };
  let log: Log = { "0,0": 1 };
  for (let i = 0; i < str.length; i += 1) {
    let char = str.charAt(i);
    if (char === "^") {
      location.y += 1;
    } else if (char === "v") {
      location.y -= 1;
    } else if (char === ">") {
      location.x += 1;
    } else if (char === "<") {
      location.x -= 1;
    }
    log[`${location.x},${location.y}`] =
      log[`${location.x},${location.y}`] + 1 || 1;
  }
  return Object.keys(log).length;
};

const numHousesVisited2 = (str: string): number => {
  let location = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];
  let index = 0;
  let log: Log = { "0,0": 2 };
  for (let i = 0; i < str.length; i += 1) {
    let char = str.charAt(i);
    if (char === "^") {
      location[index].y += 1;
    } else if (char === "v") {
      location[index].y -= 1;
    } else if (char === ">") {
      location[index].x += 1;
    } else if (char === "<") {
      location[index].x -= 1;
    }
    log[`${location[index].x},${location[index].y}`] =
      log[`${location[index].x},${location[index].y}`] + 1 || 1;
    index = (index + 1) % 2;
  }
  return Object.keys(log).length;
};

export { numHousesVisited, numHousesVisited2 };
