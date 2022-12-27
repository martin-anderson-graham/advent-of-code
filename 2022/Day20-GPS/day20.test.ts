import { parseInput } from './utils'
import { sample, input, sample2 } from './input'

xtest("sample2", () => {
    let q  = parseInput(sample2)
    //4, -2, 5, 6, 7, 8, 9
    q.print()
    let node = q.head.next
    q.moveNode(node)
    q.print()
    // 4 - 5 - 6 - 7 - 8 - -2 - 9
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
    //14135 too low
    expect(res).toBe(3)
})
