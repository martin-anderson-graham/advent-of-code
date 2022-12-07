const parseInput = (str: string): any => {
  let result = { "/": { parentDirectory: "" } };
  let currentDirectory = "/";
  str.split("\n").forEach((row) => {
    let arr = row.split(" ");
    if (arr[0] === "$") {
      if (arr[1] === "cd") {
        if (arr[2] === "..") {
          if (currentDirectory !== "/") {
            currentDirectory = result[currentDirectory].parentDirectory;
          }
        } else {
          currentDirectory = arr[2];
        }
      }
    } else if (arr[0] === "dir") {
      if (result[currentDirectory].subDirectories === undefined) {
        result[currentDirectory].subDirectories = [];
      }
      result[currentDirectory].subDirectories.push(arr[1]);
      if (result[arr[1]] === undefined) {
        result[arr[1]] = { parentDirectory: currentDirectory };
      }
    } else if (Number.isInteger(Number(arr[0]))) {
      if (result[currentDirectory].files === undefined) {
        result[currentDirectory].files = [];
      }
      result[currentDirectory].files.push({
        name: arr[1],
        size: Number(arr[0]),
      });
    }
  });
  return result;
};

const findDirectorySize = (dir: string, fs: any) => {
  console.log(dir);
  let sum = 0;
  if (fs[dir].subDirectories !== undefined) {
    fs[dir].subDirectories.forEach((sub) => {
      sum += findDirectorySize(sub, fs);
    });
  }
  if (fs[dir].files !== undefined) {
    fs[dir].files.forEach((file) => {
      sum += file.size;
    });
  }
  fs[dir].size = sum;
  return sum;
};

const totalSumUnderLimit = (fs: any, limit: number): number => {
  findDirectorySize("/", fs);
  let sum = 0;

  const traverse = (dir: string) => {
    if (fs[dir].size <= limit) {
      sum += fs[dir].size;
    }
    if (fs[dir].subDirectories !== undefined) {
      fs[dir].subDirectories.forEach((dir) => {
        traverse(dir);
      });
    }
  };

  traverse("/");
  return sum;
};
export { parseInput, findDirectorySize, totalSumUnderLimit };
