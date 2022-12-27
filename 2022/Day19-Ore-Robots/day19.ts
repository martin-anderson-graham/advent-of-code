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

const revertInventory = (i: Inventory): void => {
    i.ore -= i.oreRobot
    i.clay -= i.clayRobot
    i.obsidian -= i.obsidianRobot
    i.geode -= i.geodeRobot
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

interface BluePrintLimit {
    maxOreRobots: number;
    maxClayRobots: number;
    maxObsidianRobots: number;
}

const getBluePrintLimit = (bp: Blueprint): BluePrintLimit => {
    let maxOreRobots = Math.max(bp.oreRobot.ore, bp.clayRobot.ore, bp.obsidianRobot.ore, bp.geodeRobot.ore);
    let maxClayRobots = Math.floor(Math.max(bp.oreRobot.clay, bp.clayRobot.clay, bp.obsidianRobot.clay, bp.geodeRobot.clay));
    let maxObsidianRobots = Math.floor(Math.max(bp.oreRobot.obsidian, bp.clayRobot.obsidian, bp.obsidianRobot.obsidian, bp.geodeRobot.obsidian))

    return {
        maxOreRobots,
        maxClayRobots,
        maxObsidianRobots,
    }
}

type BuildOrderHash = {
    oreRobots: number;
    clayRobots: number;
    obsidianRobots: number;
    geodeRobots: number;
}

const buildRobot = (robotCost: Cost, inventory: Inventory) => {
    inventory.ore -= robotCost.ore
    inventory.clay -= robotCost.clay
    inventory.obsidian -= robotCost.obsidian
}

const unBuildRobot = (robotCost: Cost, inventory: Inventory) => {
    inventory.ore += robotCost.ore
    inventory.clay += robotCost.clay
    inventory.obsidian += robotCost.obsidian
}

const part1 = (timeLimit: number, blueprints: Blueprint[], part1: boolean = true): number => {
    let total = 0
    if (part1 === false) {
        total++
    }

    const recursiveBuildOrderMaker = (bp: Blueprint, depth: number, bpLimit: BluePrintLimit, bpHash: BuildOrderHash, inventory: Inventory) => {
        if (depth === timeLimit) {
            if (inventory.geode > bp.maxGeodes) {
                bp.maxGeodes = inventory.geode
            }
            return
        }

        //try geode robot - only do nothing if you can't do this
        if (canBuild(bp.geodeRobot, inventory)) {
            buildRobot(bp.geodeRobot, inventory)
            updateInventory(inventory)
            inventory.geodeRobot += 1
            bpHash.geodeRobots += 1
            recursiveBuildOrderMaker(bp, depth + 1, bpLimit, bpHash, inventory)
            unBuildRobot(bp.geodeRobot, inventory)
            bpHash.geodeRobots -= 1
            inventory.geodeRobot -= 1
            revertInventory(inventory)
        } else {
            //try obsidian
            if (bpHash.obsidianRobots < bpLimit.maxObsidianRobots && canBuild(bp.obsidianRobot, inventory)) {
                buildRobot(bp.obsidianRobot, inventory)
                updateInventory(inventory)
                inventory.obsidianRobot += 1
                bpHash.obsidianRobots += 1
                recursiveBuildOrderMaker(bp, depth + 1, bpLimit, bpHash, inventory)
                unBuildRobot(bp.obsidianRobot, inventory)
                bpHash.obsidianRobots -= 1
                inventory.obsidianRobot -= 1
                revertInventory(inventory)
            } else {
                //try clay robot
                if (bpHash.clayRobots < bpLimit.maxClayRobots && canBuild(bp.clayRobot, inventory)) {
                    buildRobot(bp.clayRobot, inventory)
                    updateInventory(inventory)
                    inventory.clayRobot += 1
                    bpHash.clayRobots += 1
                    recursiveBuildOrderMaker(bp, depth + 1, bpLimit, bpHash, inventory)
                    unBuildRobot(bp.clayRobot, inventory)
                    bpHash.clayRobots -= 1
                    inventory.clayRobot -= 1
                    revertInventory(inventory)
                }

                //try ore robot
                if (bpHash.oreRobots < bpLimit.maxOreRobots && canBuild(bp.oreRobot, inventory)) {
                    buildRobot(bp.oreRobot, inventory)
                    updateInventory(inventory)
                    inventory.oreRobot += 1
                    bpHash.oreRobots += 1
                    recursiveBuildOrderMaker(bp, depth + 1, bpLimit, bpHash, inventory)
                    unBuildRobot(bp.oreRobot, inventory)
                    bpHash.oreRobots -= 1
                    inventory.oreRobot -= 1
                    revertInventory(inventory)
                }
                //try building nothing
                updateInventory(inventory)
                recursiveBuildOrderMaker(bp, depth + 1, bpLimit, bpHash, inventory)
                revertInventory(inventory)
            }
        }
    }


    blueprints.forEach((bp, idx) => {
        let limit = getBluePrintLimit(bp)
        let hash: BuildOrderHash = {
            oreRobots: 0,
            clayRobots: 0,
            obsidianRobots: 0,
            geodeRobots: 0,
        }
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
        recursiveBuildOrderMaker(bp, 0, limit, hash, inventory)
        if (part1) {
            let val = bp.maxGeodes * (idx + 1)
            console.log(idx + 1, '/', blueprints.length, ":", val)
            total += val
        } else {
            console.log(idx + 1, '/', blueprints.length, ":", bp.maxGeodes)
            total *= bp.maxGeodes
        }
    })
    return total
}

export {
    parseInput,
    part1,
}
