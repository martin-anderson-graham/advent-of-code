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

  oneStep = (w, z, a,b,c) => {
    let x = z%26+b === w ? 0 : 1;
    z = z/a
    z = 25*x+1 * z
    z = x*(w+c) + z
    return z
}

  verify = (strNum) => {
    let z = 0
    z = this.oneStep(Number(strNum.charAt(0)), z, 1, 14, 16)
    z = this.oneStep(Number(strNum.charAt(1)), z, 1, 11, 3)
    z = this.oneStep(Number(strNum.charAt(2)), z, 1, 12, 2)
    z = this.oneStep(Number(strNum.charAt(3)), z, 1, 11, 7)
    z = this.oneStep(Number(strNum.charAt(4)), z, 26, -10, 13)
    z = this.oneStep(Number(strNum.charAt(5)), z, 1, 15, 6)
    z = this.oneStep(Number(strNum.charAt(6)), z, 26, -14, 10)
    z = this.oneStep(Number(strNum.charAt(7)), z, 1, 10, 11)
    z = this.oneStep(Number(strNum.charAt(8)), z, 26, -4, 6)
    z = this.oneStep(Number(strNum.charAt(9)), z, 26, -3, 5)
    z = this.oneStep(Number(strNum.charAt(10)), z, 1, 13, 11)
    z = this.oneStep(Number(strNum.charAt(11)), z, 26, -3, 4)
    z = this.oneStep(Number(strNum.charAt(12)), z, 26, -9, 4)
    z = this.oneStep(Number(strNum.charAt(13)), z, 26, -12, 6)
    return z===0
  }
  findLargest14Digit = (strNum = '', len = 0) => {
    if (len === 14) {
      if (this.verify(strNum)) {
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

let constants = [
[ 1, 14, 16],
[ 1, 11, 3],
[ 1, 12, 2],
[ 1, 11, 7],
[ 26, -10, 13],
[ 1, 15, 6],
[ 26, -14, 10],
[ 1, 10, 11],
[ 26, -4, 6],
[ 26, -3, 5],
[ 1, 13, 11],
[ 26, -3, 4],
[ 26, -9, 4],
[ 26, -12, 6],
]

function solve(part1 = false){

  const oneStep = (w, z, a,b,c) => {
    let x = (z%26+b === w ? 0 : 1);
    z = Math.floor(z/a)
    z = (25*x+1)* z
    z = x*(w+c) + z
    return z
  }

  //state: highest input
  let maxToGetState = {'0':0}

  for(let z = 0; z < 14; z++) {
    // console.log(z)
    let newState = {}
    Object.entries(maxToGetState).forEach(val => {
      let state = Number(val[0])
      if(state<10000000){
        for(let i = 1; i < 10; i++){
          let newNum = val[1]*10+i
          let temp = oneStep(i, state, ...constants[z])
          if(newState[temp]){
            if(part1){
              newState[temp] = Math.max(newNum, newState[temp])
            } else {
              newState[temp] = Math.min(newNum, newState[temp])
            } 
          } else {
            newState[temp] = newNum 
          }
        }
      }
    })
    maxToGetState = newState
  }

  // console.log(Object.entries(maxToGetState).filter(val => val[0]==='0'))
  return Object.entries(maxToGetState).filter(val => val[0]==='0')[0][1]
}


module.exports = {
  solve,
};
