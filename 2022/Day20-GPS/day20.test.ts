import { parseInput } from './utils'
import { sample, input, sample2 } from './input'

xtest("sample2", () => {
    let q  = parseInput(sample2)
    //4, -2, 5, 6, 7, 8, 9
    // q.print()
    q.moveNode(q.head.next)
    // q.performMixing()
    // 4 - 5 - 6 - 7 - 8 - -2 - 9
    q.print()
    console.log(q.score())
})

test("sample", () => {
    let q = parseInput(sample)
    q.performMixing() 
    let res = q.score()
    expect(res).toBe(3)
})

test("part1", () => {
    let q = parseInput(input)
    q.performMixing() 
    let res = q.score()
    expect(res).toBe(19070)
})

test("sample part 2", () => {
    let q = parseInput(sample)
    q.applyDecriptionKey(811589153)
    let res = q.score()
    expect(res).toBe(1623178306)
})

test("part 2", () => {
    let q = parseInput(input)
    q.applyDecriptionKey(811589153)
    let res = q.score()
    expect(res).toBe(14773357352059)
})
