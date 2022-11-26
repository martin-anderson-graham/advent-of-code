let {
  checkOverlap,
  parseRules,
  buildIntervals,
  computeOnLight,
} = require('./day22')
let {
  sample1,
  sample2,
  sample3,
  sample4,
} = require('./input')

test("buildIntervals", () => {
  let rules = [
    {action: 'on', vector: [1, 3]},
    {action: 'off', vector: [2, 7]},
    {action: 'on', vector: [6, 10]},
  ];
  let result = buildIntervals(rules)
  let expected = [
    {value: [0.5, 1.5], id: '0'},
    {value: [1.5, 3.5], id: '0-1'},
    {value: [3.5, 5.5], id: '1'},
    {value: [5.5, 7.5], id: '1-2'},
    {value: [7.5, 10.5], id: '2'},
  ];
  expect(result).toEqual(expected)

  let rules1 = [
    {action: 'on', vector: [10, 12]},
    {action: 'on', vector: [11, 13]},
    {action: 'off', vector: [9, 11]},
    {action: 'on', vector: [10, 10]},
  ];
  let result1 = buildIntervals(rules1)
  let expected1 = [
    {value: [8.5, 9.5], id: '2'},
    {value: [9.5, 10.5], id: '0-2-3'},
    {value: [10.5, 11.5], id: '0-1-2'},
    {value: [11.5, 12.5], id: '0-1'},
    {value: [12.5, 13.5], id: '1'},
  ];
  expect(result1).toEqual(expected1)
});

test.skip("checkoverlap", () => {
  let x = '1-2-3'
  let y = '2-4-6'
  let z = '0-2'
  let result = checkOverlap(x, y, z)
  expect(result).toBe(true)
});

test("samples part 1", () => {
  let rules1 = parseRules(sample2)
  let r1 = computeOnLight(rules1, true)
  expect(r1).toBe(590784)

  let rules2 = parseRules(sample4)
  let r2 = computeOnLight(rules2, true)
  expect(r2).toBe(653798)

  let rules3 = parseRules(sample3)
  let r3 = computeOnLight(rules3, true)
  expect(r3).toBe(474140)
})

test("samples 2", () => {
  let rules1 = parseRules(sample1)
  let r1 = computeOnLight(rules1)
  expect(r1).toBe(39)

  let rules2 = parseRules(sample3)
  let r2 = computeOnLight(rules2)
  expect(r2).toBe(2758514936282235)
});

test("part 2", () => {
  let rules2 = parseRules(sample4)
  let r2 = computeOnLight(rules2)
  expect(r2).toBe(1257350313518866)
});
