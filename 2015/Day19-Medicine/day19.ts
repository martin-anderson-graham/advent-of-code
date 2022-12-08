type Rules = {
  input: string;
  output: string;
};
type Input = {
  chem: string;
  ruleKeys: Record<string, string>;
  rules: Rules[];
};

const parseInput = (str: string): Input => {
  let arr = str.split("\n\n");

  return {
    chem: arr[1],
    ruleKeys: arr[0].split("\n").reduce((res, row) => {
      let temp = row.split(" => ");
      res[temp[0]] = true;
      return res;
    }, {}),
    rules: arr[0].split("\n").map((row) => {
      let temp = row.split(" => ");
      return {
        input: temp[0],
        output: temp[1],
      };
    }),
  };
};

const part1 = (input: Input): number => {
  let result: Record<string, number> = {};
  let idx = 0;
  while (idx < input.chem.length) {
    if (input.ruleKeys[input.chem.charAt(idx)]) {
      let matchedRules = input.rules.filter(
        (r) => r.input === input.chem.charAt(idx)
      );
      matchedRules.forEach((rule) => {
        let newString =
          input.chem.slice(0, idx) + rule.output + input.chem.slice(idx + 1);

        result[newString] = result[newString] + 1 || 1;
      });
      idx += 1;
    } else if (input.ruleKeys[input.chem.slice(idx, idx + 2)]) {
      let matchedRules = input.rules.filter(
        (r) => r.input === input.chem.slice(idx, idx + 2)
      );
      matchedRules.forEach((rule) => {
        let newString =
          input.chem.slice(0, idx) + rule.output + input.chem.slice(idx + 2);
        result[newString] = result[newString] + 1 || 1;
      });
      idx += 2;
    } else {
      idx += 1;
    }
  }
  return Object.keys(result).length;
};

export { parseInput, part1 };
