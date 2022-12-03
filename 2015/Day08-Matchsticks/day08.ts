import { count } from "./count";

const process1 = (str: string): number => {
  let preCount = 0;
  let postCount = 0;
  str.split("\n").forEach((s) => {
    preCount += s.length;
    postCount += count(s);
  });
  return preCount - postCount;
};

const count2 = (str: string): number => {
  let count = str.length;
  count += str.match(new RegExp(String.raw`"`, "g"))?.length || 0;
  count += str.match(new RegExp(String.raw`\\`, "g"))?.length || 0;
  return count + 2;
};

const process2 = (str: string): number => {
  let preCount = 0;
  let postCount = 0;
  str.split("\n").forEach((s) => {
    preCount += s.length;
    postCount += count2(s);
  });
  return postCount - preCount;
};

export { process1, count, process2 };
