let {
  add,
  explode
} = require('./day18')

test('explode', () => {
  let first = '[[[[[9,8],1],2],3],4]'
  let [_fv, fr] = explode(first)
  let fe = '[[[[0,9],2],3],4]';
  expect(fr).toBe(fe)

  let second = '[7,[6,[5,[4,[3,2]]]]]'
  let [_sv, sr] = explode(second)
  let se = '[7,[6,[5,[7,0]]]]'
  expect(sr).toBe(se)

  let third = '[[6,[5,[4,[3,2]]]],1]'
  let [_tv, tr] = explode(third)
  let te = '[[6,[5,[7,0]]],3]'
  expect(tr).toBe(te)

  let fourth = '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]'
  let [_frv, frr] = explode(fourth)
  let fre = '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]'
  expect(frr).toBe(fre)

  let fifth = '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]'
  let [_ffv, ffr] = explode(fifth)
  let ffe = '[[3,[2,[8,0]]],[9,[5,[7,0]]]]'
  expect(ffr).toBe(ffe)
})

test('add', () => {
  let one = `[1,2]`
  let two = `[[3,4],5]`
  let result = add(one, two)
  expect(result).toBe(`[[1,2],[[3,4],5]]`)
})

