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
  pixels: boolean[][];

  constructor() {
    this.cycle = 1;
    this.registers = { x: 1 };
    this.staging = [];
    this.part1Total = 0;
    this.pixels = [];
  }

  noop() {
    this.updateState();
    this.cycle += 1;
  }

  add(register: string, value: number) {
    this.updateState();
    this.cycle += 1;
    this.updateState();
    this.registers[register] += value;
    this.cycle += 1;
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

  updateState() {
    if ((this.cycle - 20) % 40 === 0) {
      this.part1Total += this.cycle * this.registers.x;
    }
    let currentRow = (this.cycle % 40) - 1;
    if (currentRow === 0) {
      this.pixels.push([]);
    }
    let onOff = Math.abs(currentRow - this.registers.x) <= 1;
    this.pixels[this.pixels.length - 1].push(onOff);
  }

  runProgram1(instructions: Instruction[]): number {
    instructions.forEach((int) => {
      this.runCommand(int);
    });

    return this.part1Total;
  }

  renderScreen(instructions: Instruction[]) {
    instructions.forEach((int) => {
      this.runCommand(int);
    });
    this.drawScreen();
  }

  drawScreen() {
    console.log(
      this.pixels
        .map((r) => {
          return r
            .map((v) => {
              if (v) {
                return "\u2588";
              } else {
                return " ";
              }
            })
            .join("");
        })
        .join("\n")
    );
  }
}

export { parseInput, CPU };
