const count = (str: string): number => {
  // console.log(new RegExp(String.raw`\\`, "g"))
  str = str.replace(new RegExp(String.raw`\\"`, "g"), "#");
  str = str.replace(new RegExp(String.raw`\\\x[0-9a-f][0-9a-f]`, "g"), "$");
  str = str.replace(new RegExp(String.raw`\\\\`, "g"), "%");
  return str.slice(1, -1).length;
};

export { count };
