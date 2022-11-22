let {
  input,
  sample,
} = require('./input')

let {
  playGame,
  playQuantum,
  generateNewArrs,
} = require('./day21')

let [a, b] = playQuantum(input, [0, 0], 0)
console.log(a, b)

