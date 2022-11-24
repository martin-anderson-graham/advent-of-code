let {computeOnLight, parseRules} = require('./day22')
let {sample4} = require('./input')
let rules2 = parseRules(sample4)
let r2 = computeOnLight(rules2, true)
console.log(r2)
//1365539627578181
//9007199254740991
//2758514936282235
