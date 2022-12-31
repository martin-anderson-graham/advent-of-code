import { sample, input } from "./input"
import { decimalToSnafu, getSnafuSum, parseInput, SNAFUtoDecimal } from "./day25"

test("S to D", () => {
    expect(SNAFUtoDecimal('1=')).toBe(3)
    expect(SNAFUtoDecimal('1=11-2')).toBe(2022)
    expect(SNAFUtoDecimal('1121-1110-1=0')).toBe(314159265)
})

test("d to s", () => {
    expect(decimalToSnafu(8)).toBe('2=')
    expect(decimalToSnafu(9)).toBe('2-')
    expect(decimalToSnafu(10)).toBe('20')
    expect(decimalToSnafu(12345)).toBe('1-0---0')
    expect(decimalToSnafu(15)).toBe('1=0')
    expect(decimalToSnafu(1747)).toBe('1=-0-2')
})

test("processSnafu", () => {
    let res = getSnafuSum(['10', '11'])
    expect(res).toBe('21')
    let res2 = getSnafuSum(['12', '11'])
    expect(res2).toBe('1==')
})

test("sample", () => {
    let i = parseInput(sample)
    let res = getSnafuSum(i)
    expect(res).toBe('2=-1=0')
})

test("part1", () => {
    let i = parseInput(input)
    let res = getSnafuSum(i)
    expect(res).toBe('2-0=11=-0-2-1==1=-22')
})

