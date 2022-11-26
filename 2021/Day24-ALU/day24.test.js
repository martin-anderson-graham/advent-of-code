let {solve} = require('./day24')
let {input} = require('./input')

test("part1", () => {
  let result = solve(true)
  expect(result).toBe(59996912981939)
})

test("part2", () => {
  let result = solve(false)
  expect(result).toBe(17241911811915)
})
