interface Cost {
    ore: number;
    clay: number;
    obsidian: number;
}

interface Blueprint {
    oreRobot: Cost;
    clayRobot: Cost;
    obsidianRobot: Cost;
    geodeRobot: Cost;
    maxGeodes: number;
}

const parseInput = (str: string): Blueprint[] => {
    let blueprints: Blueprint[] = []
    str.split('\n').forEach((row) => {
        let rowArr = row.replace(/[.]/g, "").split(' ').slice(2).filter(ele => {
            return Number.isInteger(Number(ele)) || ele === 'ore' || ele == 'clay' || ele === 'obsidian' || ele === 'geode'
        })
        let bp: Blueprint = {
            oreRobot: {
                ore: 0,
                clay: 0,
                obsidian: 0
            },
            clayRobot: {
                ore: 0,
                clay: 0,
                obsidian: 0
            },
            obsidianRobot: {
                ore: 0,
                clay: 0,
                obsidian: 0
            },
            geodeRobot: {
                ore: 0,
                clay: 0,
                obsidian: 0
            },
            maxGeodes: 0
        }
        let idx = 0
        let currentRobot: string = rowArr[idx] + 'Robot'
        idx += 1
        while (idx < rowArr.length) {
            if (Number(rowArr[idx])) {
                bp[currentRobot][rowArr[idx + 1]] = Number(rowArr[idx])
                idx += 2
            } else {
                currentRobot = rowArr[idx] + 'Robot'
                idx += 1
            }
        }
        blueprints.push(bp)
    })
    return blueprints
}

interface Inventory {
    ore: number;
    clay: number;
    obsidian: number;
    geode: number;
    oreRobot: number;
    clayRobot: number;
    obsidianRobot: number;
    geodeRobot: number;
}

const updateInventory = (i: Inventory): void => {
    i.ore += i.oreRobot
    i.clay += i.clayRobot
    i.obsidian += i.obsidianRobot
    i.geode += i.geodeRobot
}

const canBuild = (robotCost: Cost, inventory: Inventory): boolean => {
    return robotCost.ore <= inventory.ore &&
        robotCost.clay <= inventory.clay &&
        robotCost.obsidian <= inventory.obsidian
}

const findMaxGeodes = (bp: Blueprint, timeLimit: number, robotBuildOrder: string[]): number => {
    let inventory: Inventory = {
        ore: 0,
        clay: 0,
        obsidian: 0,
        geode: 0,
        oreRobot: 1,
        clayRobot: 0,
        obsidianRobot: 0,
        geodeRobot: 0
    }

    let robotBuildOrderIdx = 0
    let nextRobotToBuild = robotBuildOrder[robotBuildOrderIdx]

    for (let i = 0; i < timeLimit; i++) {
        if (nextRobotToBuild !== undefined && canBuild(bp[nextRobotToBuild], inventory)) {
            let robotCost = bp[nextRobotToBuild]
            inventory.ore -= robotCost.ore
            inventory.clay -= robotCost.clay
            inventory.obsidian -= robotCost.obsidian
            updateInventory(inventory)
            inventory[nextRobotToBuild] += 1
            robotBuildOrderIdx += 1
            nextRobotToBuild = robotBuildOrder[robotBuildOrderIdx]
        } else {
            updateInventory(inventory)
        }
    }

    return inventory.geode
}

const part1 = (timeLimit: number, blueprints: Blueprint[]): number => {
    let total = 0

    //figure out how to optimize viable build orders
    //iterate through numbers of ore/clay
    //use an object that has an order for arrays and counts of each
    const recursiveBuildOrderMaker = (bp: Blueprint, buildOrder: string[]) => {
        if (buildOrder.length === 10) {
            let max = findMaxGeodes(bp, timeLimit, buildOrder)
            if (max > bp.maxGeodes) {
                bp.maxGeodes = max
            }
        } else {
            let tempBuildOrder = buildOrder.slice()
            tempBuildOrder.push('oreRobot')
            recursiveBuildOrderMaker(bp, tempBuildOrder)
            tempBuildOrder.pop()
            tempBuildOrder.push('clayRobot')
            recursiveBuildOrderMaker(bp, tempBuildOrder)
            tempBuildOrder.pop()
            if (tempBuildOrder.includes('clayRobot')) {
                tempBuildOrder.push('obsidianRobot')
                recursiveBuildOrderMaker(bp, tempBuildOrder)
                tempBuildOrder.pop()
            }
            if (tempBuildOrder.includes('obsidianRobot')) {
                tempBuildOrder.push('geodeRobot')
                recursiveBuildOrderMaker(bp, tempBuildOrder)
                tempBuildOrder.pop()
            }
        }
    }

    blueprints.forEach((bp, idx) => {
        recursiveBuildOrderMaker(bp, [])
        total += bp.maxGeodes * (idx + 1)
    })
    return total
}

export {
    parseInput,
    part1
}
