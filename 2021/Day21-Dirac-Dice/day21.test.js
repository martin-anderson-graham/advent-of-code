let {
  input,
  sample,
} = require('./input')

let {
  playGame,
} = require('./day21')

test("sampleGame", () => {
  let score = playGame(sample)
  expect(score).toBe(739785)
});

test("part1", () => {
  let score = playGame(input)
  expect(score).toBe(864900)
});
