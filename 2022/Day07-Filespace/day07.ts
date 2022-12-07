const parseInput = (str: string): any => {
  let result = { "/": { subDirectories: [], files: [] } };
  let path = [];
  str.split("\n").forEach((row) => {
    let arr = row.split(" ");
    if (arr[0] === "$") {
      if (arr[1] === "cd") {
        if (arr[2] === "..") {
          path.pop();
        } else {
          path.push(arr[2]);
        }
      }
    } else if (arr[0] === "dir") {
      let fullPath = path.join("/");
      let childPath = fullPath + "/" + arr[1];
      result[childPath] = {
        parentDirectory: fullPath,
        files: [],
        subDirectories: [],
      };
      result[fullPath].subDirectories.push(childPath);
    } else if (Number.isInteger(Number(arr[0]))) {
      let fullPath = path.join("/");
      result[fullPath].files.push({
        name: arr[1],
        size: Number(arr[0]),
      });
    }
  });
  return result;
};

const findDirectorySize = (dir: string, fs: any) => {
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

const sizeOfDirToDelete = (fs: any, unusedTarget: number): number => {
  findDirectorySize("/", fs);
  let total = fs["/"].size;
  const needToFree = unusedTarget - (70000000 - total);
  let bestDir;
  const traverse = (dir: string) => {
    if (fs[dir].size >= needToFree) {
      if (!bestDir || fs[bestDir].size >= fs[dir].size) {
        bestDir = dir;
      }
    }
    if (fs[dir].subDirectories !== undefined) {
      fs[dir].subDirectories.forEach((dir) => {
        traverse(dir);
      });
    }
  };
  traverse("/");
  return fs[bestDir].size;
};
export { parseInput, findDirectorySize, totalSumUnderLimit, sizeOfDirToDelete };
