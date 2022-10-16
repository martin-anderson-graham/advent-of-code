let path = require("path");
let fs = require("fs");

let inputString = "./input2.txt";

let input = fs
  .readFileSync(path.resolve(__dirname, inputString))
  .toString()
  .split(/\r?\n/);

let polymer = input[0];

let pairs = input.slice(2).map((ele) => ele.split(" -> "));

let findRulesToInsert = (poly, rules) => {
  let result = [];
  for (let idx = 0; idx < poly.length - 1; idx++) {
    let rule = rules.find((ele) => ele[0] === poly.slice(idx, idx + 2));
    result.push(rule);
  }
  return result;
};

let insertRules = (poly, rules) => {
  let result = "";
  for (let idx = 0; idx < poly.length - 1; idx++) {
    result += poly[idx];
    result += rules[idx][1];
  }
  result += poly[poly.length - 1];
  return result;
};

let iterateRules = (poly, rules, n) => {
  let result = poly;
  for (let idx = 0; idx < n; idx++) {
    result = insertRules(result, findRulesToInsert(result, rules));
  }

  return result;
};

const combineHashes = (hash1, hash2) => {
  let new1 = JSON.parse(JSON.stringify(hash1));
  Object.entries(hash2).forEach(([key, value]) => {
    new1[key] = new1[key] + value || value;
  });
  return new1;
};

const appendToHash = (originalHash, toAddHash) => {
  Object.entries(toAddHash).forEach(([key, value]) => {
    originalHash[key] = originalHash[key] + value || value;
  });
  return originalHash;
};

let hashScore = (countHash) => {
  let counts = Object.values(countHash).sort((a, b) => a - b);
  return counts[counts.length - 1] - counts[0];
};

let recursiveSolve = (poly, rules, depth) => {
  const countHash = {};
  const memo = {};
  for (let i = 0; i < poly.length - 1; i++) {
    incrementHashValue(countHash, poly.charAt(i));
    appendToHash(
      countHash,
      recursiveCount(poly.charAt(i), poly.charAt(i + 1), rules, depth, memo)
    );
  }
  incrementHashValue(countHash, poly.charAt(poly.length - 1));
  return hashScore(countHash);
};

const incrementHashValue = (hash, value) => {
  hash[value] = hash[value] + 1 || 1;
};

let recursiveCount = (first, second, rules, depthRemaining, memo) => {
  const result = {};
  if (depthRemaining === 0) {
    return {};
  } else if (memo[`${first}${second}${depthRemaining}`]) {
    return memo[`${first}${second}${depthRemaining}`];
  } else {
    const middle = rules.find((ele) => ele[0] === `${first}${second}`)[1];
    incrementHashValue(result, middle);
    const hash1 = recursiveCount(
      first,
      middle,
      rules,
      depthRemaining - 1,
      memo
    );
    appendToHash(result, hash1);
    const hash2 = recursiveCount(
      middle,
      second,
      rules,
      depthRemaining - 1,
      memo
    );
    appendToHash(result, hash2);
    memo[`${first}${second}${depthRemaining}`] = result;
    return result;
  }
};

let partOneScore = (poly) => {
  let letters = {};
  for (let idx = 0; idx < poly.length; idx++) {
    letters[poly[idx]] = letters[poly[idx]] + 1 || 1;
  }
  let counts = Object.values(letters).sort((a, b) => a - b);
  return counts[counts.length - 1] - counts[0];
};

module.exports = {
  recursiveSolve,
  partOneScore,
  iterateRules,
};
