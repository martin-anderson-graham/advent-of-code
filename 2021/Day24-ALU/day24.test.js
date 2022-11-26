let {ALU} = require('./day24')
let {input} = require('./input')

test('small samples', () => {
  let i1 = 3
  let instructions1 = `inp x\nmul x -1`
  let comp1 = new ALU(i1, instructions1)
  comp1.runProgram()
  expect(comp1.x).toBe(-3)

  let i2 = 39
  let instructions2 = `inp z
inp x
mul z 3
eql z x`
  let comp2 = new ALU(i2, instructions2)
  comp2.runProgram()
  expect(comp2.z).toBe(1)

  let i3 = 38
  let instructions3 = `inp z
inp x
mul z 3
eql z x`
  let comp3 = new ALU(i3, instructions3)
  comp3.runProgram()
  expect(comp3.z).toBe(0)

  let i4 = 7
  let instructions4 = `inp w
add z w
mod z 2
div w 2
add y w
mod y 2
div w 2
add x w
mod x 2
div w 2
mod w 2`
  let comp4 = new ALU(i4, instructions4)
  comp4.runProgram()
  let result = `${comp4.z}${comp4.y}${comp4.x}${comp4.w}`
  expect(result).toBe('1110')
})

test("part1", () => {
  let comp = new ALU(0, input)
  comp.findLargest14Digit()
  expect(comp.largestValidNumber).toBe(1)
})
