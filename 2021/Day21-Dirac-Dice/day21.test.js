let {
  input,
  sample,
} = require('./input')

let {
  playGame,
  playQuantum,
} = require('./day21')

test("sampleGame", () => {
  let score = playGame(sample)
  expect(score).toBe(739785)
});

test("part1", () => {
  let score = playGame(input)
  expect(score).toBe(864900)
});

test("sample2", () => {
  let score = playQuantum(sample, [0, 0])
  expect(score).toBe(444356092776315)
});
