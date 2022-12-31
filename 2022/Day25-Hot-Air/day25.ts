const parseInput = (str: string): string[] => {
    return str.split('\n')
}

const mapping: Record<string, number> = {
    '2': 2,
    '1': 1,
    '0': 0,
    '-': -1,
    '=': -2
}

const dtosmapping: Record<string, string> = {
    '2': '2',
    '1': '1',
    '0': '0',
    '-1': '-',
    '-2': '=',
}

const SNAFUtoDecimal = (snafu: string): number => {
    let res = 0
    let str = snafu.split('').reverse().join('')
    for (let i = 0; i < str.length; i++) {
        res += Math.pow(5, i) * mapping[str.charAt(i)]
    }
    return res
}
//0 0
//1 1
//2 2
//3 1=
//4 1-
//5 10
//6 11
//7 12
//8 2=
//9 2-
//10 20


const increment = (res: Result, idx: number) => {
    if (idx === res.length) {
        res.svals[idx] = '1'
        res.length += 1
        return
    }

    if (res.svals[idx] === '=') {
        res.svals[idx] = '-'
    } else if (res.svals[idx] === '-') {
        res.svals[idx] = '0'
    } else if (res.svals[idx] === '0') {
        res.svals[idx] = '1'
    } else if (res.svals[idx] === '1') {
        res.svals[idx] = '2'
    } else if (res.svals[idx] === '2') {
        res.svals[idx] = '='
        increment(res, idx + 1)
    }

}

const decrement = (res: Result, idx: number) => {
    if (idx === res.length) {
        throw new Error("Trying to decrement nothing")
    }

    if (res.svals[idx] === '=') {
        res.svals[idx] = '2'
        decrement(res, idx + 1)
    } else if (res.svals[idx] === '-') {
        res.svals[idx] = '='
    } else if (res.svals[idx] === '0') {
        res.svals[idx] = '-'
    } else if (res.svals[idx] === '1') {
        res.svals[idx] = '0'
    } else if (res.svals[idx] === '2') {
        res.svals[idx] = '1'
    }

}
type Result = {
    svals: Record<string, string>,
    dvals: Record<string, number>,
    length: number
}

const decimalToSnafu = (num: number): string => {
    let res: Result = {
        svals: {
            '0': '0'
        },
        dvals: {},
        length: 1
    }

    for (let i = 0; i < num; i++) {
        increment(res, 0)
    }
    //I'm making it backwards so I can just work from the front
    let val = ''
    for (let i = 0; i < res.length; i++) {
        val = res.svals[i] + val
    }
    return val
}

const processResultToSnafu = (res: Result): string => {
    for (let i = 0; i < res.length; i++) {
        if (res.dvals[i] < -2) {
            while (res.dvals[i] < -2) {
                res.dvals[i] = res.dvals[i] + 5
                if (res.dvals[i + 1] !== undefined) {
                    res.dvals[i + 1] -= 1
                } else {
                    throw new Error("Nothing to decrement")
                }
            }
        } else if (res.dvals[i] > 2) {
            while (res.dvals[i] > 2) {
                res.dvals[i] = res.dvals[i] - 5
                if (res.dvals[i + 1] !== undefined) {
                    res.dvals[i + 1] += 1
                } else {
                    res.dvals[i + 1] = 1
                    res.length += 1
                }
            }
        }
        res.svals[i] = dtosmapping[res.dvals[i]]
    }
    let answer = ''
    for (let i = 0; i < res.length; i++) {
        answer = res.svals[i] + answer
    }
    return answer
}

const getSnafuSum = (snafus: string[]): string => {
    //just add the number in snafu form (maybe reverse them first for convenience)
    let reversedSnafus = snafus.map(s => s.split('').reverse().join(''))
    let maxLength = Math.max(...reversedSnafus.map(v => v.length))
    let res: Result = {
        svals: {},
        dvals: {},
        length: maxLength,
    }

    for (let i = 0; i < maxLength; i++) {
        let sum = 0
        reversedSnafus.forEach(rs => {
            let num = mapping[rs.charAt(i)]
            if (num !== undefined) {
                sum += num
            }
        })
        res.dvals[i] = sum
    }
    return processResultToSnafu(res)
}

export {
    parseInput,
    SNAFUtoDecimal,
    getSnafuSum,
    decimalToSnafu,
}
