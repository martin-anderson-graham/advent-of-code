interface Instruction {
  op: string;
  register?: string;
  value?: number;
}

interface StagedInstruction extends Instruction {
  countdown: number;
}

const parseInput = (str: string): Instruction[] => {
  return str.split("\n").map((line) => {
    if (line === "noop") {
      return { op: "noop" };
    } else {
      return {
        op: "add",
        register: line.charAt(3),
        value: Number(line.slice(5)),
      };
    }
  });
};
class CPU {
  cycle: number;
  registers: Record<string, number>;
  staging: StagedInstruction[];
  part1Total: number;

  constructor() {
    this.cycle = 1;
    this.registers = { x: 1 };
    this.staging = [];
    this.part1Total = 0;
  }

  noop() {}

  add(register: string, value: number) {
    this.staging.push({
      op: "add",
      register: register,
      value: value,
      countdown: 2,
    });
  }

  runCommand(int: Instruction) {
    if (int.op === "noop") {
      this.noop();
    } else if (int.op === "add") {
      if (int.register !== undefined && int.value !== undefined) {
        this.add(int.register, int.value);
      }
    }
  }

  processStaging() {
    this.staging.forEach((s) => (s.countdown -= 1));

    this.staging
      .filter((s) => s.countdown === 0)
      .forEach((int) => {
        if (int.op === "add") {
          if (int.register && int.value) {
            console.log(this.cycle, "---", this.registers.x);
            this.registers[int.register] += int.value;
          }
        }
      });

    this.staging = this.staging.filter((s) => s.countdown !== 0);
  }

  updatePart1Total() {
    if ((this.cycle - 20) % 40 === 0) {
      this.part1Total += this.cycle * this.registers.x;
    }
  }

  runProgram(instructions: Instruction[]): number {
    instructions.forEach((int) => {
      this.cycle += 1;
      this.runCommand(int);
      this.updatePart1Total();
      this.processStaging();
    });

    return this.part1Total;
  }
}

export { parseInput, CPU };
