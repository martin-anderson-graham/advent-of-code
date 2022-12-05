const countJSON = (str: string, ignoreRed = false): number => {
  let json = JSON.parse(str);
  return count(json, ignoreRed);
};

const count = (thing: any, ignoreRed: boolean): number => {
  if (Array.isArray(thing)) {
    return thing.reduce((sum, ele) => sum + count(ele, ignoreRed), 0);
  } else if (typeof thing === "object") {
    if (ignoreRed) {
      let vals = Object.values(thing) as any[];
      if (vals.includes("red")) {
        return 0;
      }
    }
    let result = Object.values(thing).reduce(
      (sum: number, val: any) => sum + count(val, ignoreRed),
      0
    ) as number;
    return result;
  } else if (typeof thing === "string") {
    return 0;
  } else if (typeof thing === "number") {
    return thing;
  } else {
    return 0;
  }
};

export { countJSON };
