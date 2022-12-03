type Actions = "STORE" | "NOT" | "AND" | "LSHIFT" | "RSHIFT" | "OR";

type Rule = {
  action: Actions;
  args: (string | number)[];
  output: string;
};
const parseInput = (str: string): Rule[] => {
  return str.split("\n").map((r) => {
    let rule = r.split(" -> ");
    let first = rule[0].split(" ");
    let action: Actions;
    let output = rule[1];
    let args: (string | number)[] = [];

    if (first.length === 1) {
      action = "STORE";
      args = first;
    } else if (first.length === 2) {
      action = "NOT";
      args = [first[1]];
    } else {
      if (
        !(
          first[1] === "STORE" ||
          first[1] === "NOT" ||
          first[1] === "AND" ||
          first[1] === "LSHIFT" ||
          first[1] === "RSHIFT" ||
          first[1] === "OR"
        )
      ) {
        throw new Error("Invalid input");
      }
      action = first[1];
      args = [first[0], first[2]];
    }

    return {
      action,
      args,
      output,
    };
  });
};

const process = (
  rulesArr: Rule[],
  skipB = false,
  bVal = 0
): number | undefined => {
  const values: Record<string, number> = {};
  if (skipB) {
    values["b"] = bVal;
  }
  const used = new Array(rulesArr.length).fill(false);
  while (used.some((v) => !v)) {
    for (let i = 0; i < rulesArr.length; i++) {
      if (used[i]) {
        continue;
      }
      let rule = rulesArr[i];
      if (skipB && rule.output === "b") {
        used[i] = true;
        continue;
      }
      if (rule.action === "STORE") {
        if (Number.isInteger(Number(rule.args[0]))) {
          values[rule.output] = Number(rule.args[0]);
          used[i] = true;
          break;
        } else if (values[rule.args[0]]) {
          values[rule.output] = values[rule.args[0]];
          used[i] = true;
          break;
        }
      } else if (rule.action === "NOT") {
        if (Number.isInteger(Number(rule.args[0]))) {
          values[rule.output] = ~Number(rule.args[0]);
          while (values[rule.output] < 0) {
            values[rule.output] += 65536;
          }
          used[i] = true;
          break;
        } else if (Number.isInteger(values[rule.args[0]])) {
          values[rule.output] = ~values[rule.args[0]];
          while (values[rule.output] < 0) {
            values[rule.output] += 65536;
          }
          used[i] = true;
          break;
        }
      } else if (rule.action === "OR") {
        let one = Number.isInteger(Number(rule.args[0]))
          ? Number(rule.args[0])
          : values[rule.args[0]];
        let two = Number.isInteger(Number(rule.args[1]))
          ? Number(rule.args[1])
          : values[rule.args[1]];
        if (one === undefined || two === undefined) {
          continue;
        }
        values[rule.output] = one | two;
        used[i] = true;
        break;
      } else if (rule.action === "AND") {
        let one = Number.isInteger(Number(rule.args[0]))
          ? Number(rule.args[0])
          : values[rule.args[0]];
        let two = Number.isInteger(Number(rule.args[1]))
          ? Number(rule.args[1])
          : values[rule.args[1]];
        if (one === undefined || two === undefined) {
          continue;
        }
        values[rule.output] = one & two;
        used[i] = true;
        break;
      } else if (rule.action === "RSHIFT") {
        let one = Number.isInteger(Number(rule.args[0]))
          ? Number(rule.args[0])
          : values[rule.args[0]];
        let two = Number.isInteger(Number(rule.args[1]))
          ? Number(rule.args[1])
          : values[rule.args[1]];
        if (one === undefined || two === undefined) {
          continue;
        }
        values[rule.output] = one >> two;
        used[i] = true;
        break;
      } else if (rule.action === "LSHIFT") {
        let one = Number.isInteger(Number(rule.args[0]))
          ? Number(rule.args[0])
          : values[rule.args[0]];
        let two = Number.isInteger(Number(rule.args[1]))
          ? Number(rule.args[1])
          : values[rule.args[1]];
        if (one === undefined || two === undefined) {
          continue;
        }
        values[rule.output] = one << two;
        used[i] = true;
        break;
      }
    }
  }
  return values["a"];
};
const process2 = (rulesArr: Rule[]): number => {
  const a = process(rulesArr, false, 0);
  return process(rulesArr, true, a);
};

export { parseInput, process, process2 };
