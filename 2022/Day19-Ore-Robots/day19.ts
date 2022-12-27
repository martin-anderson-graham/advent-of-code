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

const orderKey = {
    o: 'oreRobot',
    c: 'clayRobot',
    O: 'obsidianRobot',
    g: 'geodeRobot',
}

type Result = {
    geodes: number;
    timeLeft: boolean;
}
const findMaxGeodes = (bp: Blueprint, timeLimit: number, robotBuildOrder: string): Result => {
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
    let nextRobotToBuild = orderKey[robotBuildOrder.charAt(robotBuildOrderIdx)]

    for (let i = 0; i < timeLimit; i++) {
        if (nextRobotToBuild !== undefined && canBuild(bp[nextRobotToBuild], inventory)) {
            let robotCost = bp[nextRobotToBuild]
            inventory.ore -= robotCost.ore
            inventory.clay -= robotCost.clay
            inventory.obsidian -= robotCost.obsidian
            updateInventory(inventory)
            inventory[nextRobotToBuild] += 1
            robotBuildOrderIdx += 1
            nextRobotToBuild = orderKey[robotBuildOrder.charAt(robotBuildOrderIdx)]
        } else {
            updateInventory(inventory)
        }
    }

    return { geodes: inventory.geode, timeLeft: nextRobotToBuild === undefined }
}

//this one takes a string with '.' representing a no-build round
const findBuiltGeodesCount = (buildOrder: string, bp: Blueprint): number => {
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

    for (let i = 0; i < buildOrder.length; i++) {
        let currentOrder = buildOrder.charAt(i)
        if (currentOrder === '.') {
            updateInventory(inventory)
        } else {
            let robotCost = bp[orderKey[currentOrder]]
            inventory.ore -= robotCost.ore
            inventory.clay -= robotCost.clay
            inventory.obsidian -= robotCost.obsidian
            updateInventory(inventory)
            inventory[orderKey[currentOrder]] += 1
        }
    }

    return inventory.geode
}

interface BluePrintLimit {
    maxOreRobots: number;
    maxClayRobots: number;
    maxObsidianRobots: number;
    maxGeodeRobots: number;
}

const getBluePrintLimit = (bp: Blueprint): BluePrintLimit => {
    let maxOreRobots = Math.max(bp.oreRobot.ore, bp.clayRobot.ore, bp.obsidianRobot.ore, bp.geodeRobot.ore);
    let maxClayRobots = Math.floor(Math.max(bp.oreRobot.clay, bp.clayRobot.clay, bp.obsidianRobot.clay, bp.geodeRobot.clay));
    let maxObsidianRobots = Math.floor(Math.max(bp.oreRobot.obsidian, bp.clayRobot.obsidian, bp.obsidianRobot.obsidian, bp.geodeRobot.obsidian))

    return {
        maxOreRobots,
        maxClayRobots,
        maxObsidianRobots,
        maxGeodeRobots: 20,
    }
}

type BuildOrderHash = {
    oreRobots: number;
    clayRobots: number;
    obsidianRobots: number;
    geodeRobots: number;
}

// const isOrderComplete = (bpLimit: BluePrintLimit, bpHash: BuildOrderHash): boolean => {
//     return bpLimit.maxOreRobots === bpHash.oreRobots &&
//         bpLimit.maxClayRobots === bpHash.clayRobots &&
//         bpLimit.maxObsidianRobots === bpHash.obsidianRobots &&
//         bpLimit.maxGeodeRobots === bpHash.geodeRobots
// }

const part1 = (timeLimit: number, blueprints: Blueprint[]): number => {
    let total = 0

    //figure out how to optimize viable build orders
    //iterate through numbers of ore/clay
    // const recursiveBuildOrderMaker = (bp: Blueprint, buildOrder: string, bpLimit: BluePrintLimit, bpHash: BuildOrderHash) => {
    //     let res = findMaxGeodes(bp, timeLimit, buildOrder)
    //     let max = res.geodes
    //     if (max > bp.maxGeodes) {
    //         bp.maxGeodes = max
    //         console.log(bpHash, bp.maxGeodes)
    //     }
    //     if (!res.timeLeft) {
    //         return
    //     }
    //     if (bpHash.oreRobots < bpLimit.maxOreRobots) {
    //         buildOrder += 'o'
    //         bpHash.oreRobots += 1
    //         recursiveBuildOrderMaker(bp, buildOrder, bpLimit, bpHash)
    //         buildOrder = buildOrder.slice(0, -1)
    //         bpHash.oreRobots -= 1
    //     }
    //     if (bpHash.clayRobots < bpLimit.maxClayRobots) {
    //         buildOrder += 'c'
    //         bpHash.clayRobots += 1
    //         recursiveBuildOrderMaker(bp, buildOrder, bpLimit, bpHash)
    //         buildOrder = buildOrder.slice(0, -1)
    //         bpHash.clayRobots -= 1
    //     }
    //     if (bpHash.clayRobots > 1 && bpHash.obsidianRobots < bpLimit.maxObsidianRobots) {
    //         buildOrder += 'O'
    //         bpHash.obsidianRobots += 1
    //         recursiveBuildOrderMaker(bp, buildOrder, bpLimit, bpHash)
    //         buildOrder = buildOrder.slice(0, -1)
    //         bpHash.obsidianRobots -= 1
    //     }
    //     if (bpHash.obsidianRobots > 1 && bpHash.geodeRobots < bpLimit.maxGeodeRobots) {
    //         buildOrder += 'g'
    //         bpHash.geodeRobots += 1
    //         recursiveBuildOrderMaker(bp, buildOrder, bpLimit, bpHash)
    //         buildOrder = buildOrder.slice(0, -1)
    //         bpHash.geodeRobots -= 1
    //     }
    // }

    // TODO: update inventory - kinda feels like I'm just doing all the inventory stuff here, so why do twice?
    const recursiveBuildOrderMaker = (bp: Blueprint, buildOrder: string, bpLimit: BluePrintLimit, bpHash: BuildOrderHash) => {
        if(buildOrder.length === timeLimit) {
            let max = findBuiltGeodesCount(buildOrder, bp)
            if (max > bp.maxGeodes) {
                bp.maxGeodes = max
                console.log(bpHash, bp.maxGeodes)
            }
        }
        //try building nothing
            buildOrder += '.'
            recursiveBuildOrderMaker(bp, buildOrder, bpLimit, bpHash)
            buildOrder = buildOrder.slice(0, -1)
        //only add robots you can afford to the build string    
    }

    blueprints.forEach((bp, idx) => {
        let limit = getBluePrintLimit(bp)
        let hash: BuildOrderHash = {
            oreRobots: 0,
            clayRobots: 0,
            obsidianRobots: 0,
            geodeRobots: 0,
        }
        recursiveBuildOrderMaker(bp, '', limit, hash)
        let val = bp.maxGeodes * (idx + 1)
        total += val
    })
    return total
}

const part2 = (timeLimit: number, blueprints: Blueprint[]): number => {
    let total = 0

    const recursiveBuildOrderMaker = (bp: Blueprint, buildOrder: string, bpLimit: BluePrintLimit, bpHash: BuildOrderHash) => {
        let res = findMaxGeodes(bp, timeLimit, buildOrder)
        let max = res.geodes
        if (max > bp.maxGeodes) {
            bp.maxGeodes = max
        }
        if (!res.timeLeft) {
            return
        }
        if (bpHash.oreRobots < bpLimit.maxOreRobots) {
            buildOrder += 'o'
            bpHash.oreRobots += 1
            recursiveBuildOrderMaker(bp, buildOrder, bpLimit, bpHash)
            buildOrder = buildOrder.slice(0, -1)
            bpHash.oreRobots -= 1
        }
        if (bpHash.clayRobots < bpLimit.maxClayRobots) {
            buildOrder += 'c'
            bpHash.clayRobots += 1
            recursiveBuildOrderMaker(bp, buildOrder, bpLimit, bpHash)
            buildOrder = buildOrder.slice(0, -1)
            bpHash.clayRobots -= 1
        }
        if (bpHash.clayRobots > 1 && bpHash.obsidianRobots < bpLimit.maxObsidianRobots) {
            buildOrder += 'O'
            bpHash.obsidianRobots += 1
            recursiveBuildOrderMaker(bp, buildOrder, bpLimit, bpHash)
            buildOrder = buildOrder.slice(0, -1)
            bpHash.obsidianRobots -= 1
        }
        if (bpHash.obsidianRobots > 1 && bpHash.geodeRobots < bpLimit.maxGeodeRobots) {
            buildOrder += 'g'
            bpHash.geodeRobots += 1
            recursiveBuildOrderMaker(bp, buildOrder, bpLimit, bpHash)
            buildOrder = buildOrder.slice(0, -1)
            bpHash.geodeRobots -= 1
        }
    }


    blueprints.forEach(bp => {
        let limit = getBluePrintLimit(bp)
        let hash: BuildOrderHash = {
            oreRobots: 0,
            clayRobots: 0,
            obsidianRobots: 0,
            geodeRobots: 0,
        }
        recursiveBuildOrderMaker(bp, '', limit, hash)
        console.log(bp.maxGeodes)
        total += bp.maxGeodes
    })
    return total
}
export {
    parseInput,
    part1,
    part2
}
