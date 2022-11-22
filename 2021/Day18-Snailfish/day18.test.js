let {
  sample1,
  sample2,
  sample3,
  sample4,
  sample5,
  part1input
} = require('./input');
let {
  arrayize,
  unarrayize,
  add,
  explode,
  split,
  reduce,
  totalSum,
  part1,
  part2,
  magnitude,
} = require('./day18')

test('explode', () => {
  let first = arrayize('[[[[[9,8],1],2],3],4]')
  let [_fv, fr] = explode(first)
  let fe = '[[[[0,9],2],3],4]';
  expect(fr.join('')).toBe(fe)

  let second = arrayize('[7,[6,[5,[4,[3,2]]]]]')
  let [_sv, sr] = explode(second)
  let se = '[7,[6,[5,[7,0]]]]'
  expect(sr.join('')).toBe(se)

  let third = arrayize('[[6,[5,[4,[3,2]]]],1]')
  let [_tv, tr] = explode(third)
  let te = '[[6,[5,[7,0]]],3]'
  expect(tr.join('')).toBe(te)

  let fourth = arrayize('[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]')
  let [_frv, frr] = explode(fourth)
  let fre = '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]'
  expect(frr.join('')).toBe(fre)

  let fifth = arrayize('[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]')
  let [_ffv, ffr] = explode(fifth)
  let ffe = '[[3,[2,[8,0]]],[9,[5,[7,0]]]]'
  expect(ffr.join('')).toBe(ffe)

  let sixth = arrayize('[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]')
  let [_sxv, sxr] = explode(sixth)
  let sxe = '[[[[0,7],4],[[7,8],[6,0]]],[8,1]]'
  expect(sxr.join('')).toBe(sxe)
})

test('add', () => {
  let one = `[1,2]`
  let two = `[[3,4],5]`
  let result = add(one, two)
  expect(result).toBe(`[[1,2],[[3,4],5]]`)
})

test("split", () => {
  let first = [10]
  let [_fv, fr] = split(first)
  expect(fr.join('')).toBe('[5,5]')

  let second = [11]
  let [_sv, sr] = split(second)
  expect(sr.join('')).toBe('[5,6]')

  let third = [12]
  let [_tv, tr] = split(third)
  expect(tr.join('')).toBe('[6,6]')
})

test("reduce", () => {
  let input = arrayize('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]')
  let result = reduce(input)
  expect(result.join('')).toBe('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]')

  let two = add('[[[[4,3],4],4],[7,[[8,4],9]]]', '[1,1]')
  let twoarr = arrayize(two)
  let result2 = reduce(twoarr)
  expect(result2.join('')).toBe('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]')
})

test("sample multi-lines", () => {
  let input1 = sample1
  let result1 = totalSum(input1)
  expect(result1.join('')).toBe('[[[[1,1],[2,2]],[3,3]],[4,4]]')

  let input2 = sample2
  let result2 = totalSum(input2)
  expect(result2.join('')).toBe('[[[[3,0],[5,3]],[4,4]],[5,5]]')

  let input3 = sample3
  let result3 = totalSum(input3)
  expect(result3.join('')).toBe('[[[[5,0],[7,4]],[5,5]],[6,6]]')

  let input4 = sample4
  let result4 = totalSum(input4)
  expect(result4.join('')).toBe('[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]')
})

test("magnitude", () => {
  let first = `[1,9]`
  let result1 = magnitude(unarrayize(first))
  expect(result1).toBe(21)

  let second = `[9,1]`
  let result2 = magnitude(unarrayize(second))
  expect(result2).toBe(29)

  let third = '[[9,1],[1,9]]'
  let result3 = magnitude(unarrayize(third))
  expect(result3).toBe(129)

  let fourth = '[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]'
  let result4 = magnitude(unarrayize(fourth))
  expect(result4).toBe(3488)
})

test("part1", () => {
  let input1 = sample5
  let result1 = part1(input1)
  expect(result1).toBe(4140)

  let input2 = part1input
  let result2 = part1(input2)
  expect(result2).toBe(4145)
})

test("part2", () => {
  let input1 = sample5
  let result1 = part2(input1)
  expect(result1).toBe(3993)

  let input2 = part1input
  let result2 = part2(input2)
  expect(result2).toBe(4855)
});
