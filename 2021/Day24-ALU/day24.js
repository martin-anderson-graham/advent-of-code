let inputIndex = 0
let instructionsIndex = 0
let instructionsLength = 0

class ALU {
  constructor(modelNumberString, instructionString) {
    this.input = modelNumberString
    this.largestValidNumber = ''
    this.w = 0
    this.x = 0
    this.y = 0
    this.z = 0
    this.instructions = instructionString.split('\n').map(row => {
      let i = row.split(' ')
      let op = i.shift()
      return {op, args: [...i]}
    });
    instructionsLength = this.instructions.length
    instructionsIndex = 0
  };

  getNextInput = () => {
    let val = this.input.charAt(inputIndex)
    inputIndex += 1
    return val;
  };

  inp = (register) => {
    this[register] = this.getNextInput()
  };

  add = (a, b) => {
    let val
    if (b.match(/[wxyz]/)) {
      val = this[b]
    } else {
      val = Number(b)
    };
    this[a] = this[a] + val
  };

  div = (a, b) => {
    let val
    if (b.match(/[wxyz]/)) {
      val = this[b]
    } else {
      val = Number(b)
    };
    if (val === 0) {
      throw new Error("Cannot divide by zero")
    };
    this[a] = Math.floor(this[a] / val)
  };

  mul = (a, b) => {
    let val
    if (b.match(/[wxyz]/)) {
      val = this[b]
    } else {
      val = Number(b)
    };
    this[a] = this[a] * val
  };

  mod = (a, b) => {
    let val
    if (b.match(/[wxyz]/)) {
      val = this[b]
    } else {
      val = Number(b)
    };
    if (this[a] < 0 || val <= 0) {
      throw new Error("Invalid mod operators")
    };
    this[a] = this[a] % val
  };

  eql = (a, b) => {
    let val
    if (b.match(/[wxyz]/)) {
      val = this[b]
    } else {
      val = Number(b)
    };
    let bool = (this[a] === val)
    if (bool) {
      this[a] = 1
    } else {
      this[a] = 0
    };
  };

  reInitialize = (modelNumber) => {
    this.w = 0
    this.x = 0
    this.y = 0
    this.z = 0
    inputIndex = 0
    instructionsIndex = 0
    this.input = modelNumber
  };

  runProgram = () => {
    while (instructionsIndex < instructionsLength) {
      let current = this.instructions[instructionsIndex]
      instructionsIndex += 1
      this[current.op](...current.args)
    };
  };

  findLargest14Digit = (strNum = '', len = 0) => {
    if (len === 14) {
      // console.log(strNum)
      this.reInitialize(strNum)
      this.runProgram()
      if (this.z === 0) {
        this.largestValidNumber = strNum
        return true
      }
      return false
    };
    for (let i = 9; i > 0; i--) {
      let newNum = strNum + String(i)
      let valid = this.findLargest14Digit(newNum, len + 1)
      if (valid) {
        return true
      }
      continue
    };
    return false
  };
};

module.exports = {
  ALU,
};
