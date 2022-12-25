interface Cube {
    x: number;
    y: number;
    z: number;
}

const parseInput = (str: string): Cube[] => {
    let result: Cube[] = []
    str.split('\n').forEach(row => {
        let r = row.split(',')
        result.push({
            x: Number(r[0]),
            y: Number(r[1]),
            z: Number(r[2]),
        })
    })
    return result
}

function cubeString(c: Cube): string {
    return `${c.x},${c.y},${c.z}`
}

function getNeighborCubeStrings(c: Cube): string[] {
    let neighbors: string[] = []
    neighbors.push(cubeString({ x: c.x - 1, y: c.y, z: c.z }))
    neighbors.push(cubeString({ x: c.x + 1, y: c.y, z: c.z }))
    neighbors.push(cubeString({ x: c.x, y: c.y - 1, z: c.z }))
    neighbors.push(cubeString({ x: c.x, y: c.y + 1, z: c.z }))
    neighbors.push(cubeString({ x: c.x, y: c.y, z: c.z - 1 }))
    neighbors.push(cubeString({ x: c.x, y: c.y, z: c.z + 1 }))
    return neighbors
}

function countNewSides(cube: Cube, processedCubes: Record<string, Cube>): number {
    let sides = 6
    let neighbors = getNeighborCubeStrings(cube)
    neighbors.forEach(n => {
        if (processedCubes[n]) {
            sides -= 2
        }
    })
    return sides
}

const part1 = (cubes: Cube[]): number => {
    let total = 0
    let processedCubes: Record<string, Cube> = {};

    cubes.forEach(c => {
        total += countNewSides(c, processedCubes)
        processedCubes[cubeString(c)] = c
    })

    return total
}

const getNeighborCubes = (c: Cube): Cube[] => {
    let neighbors: Cube[] = []
    neighbors.push({ x: c.x - 1, y: c.y, z: c.z })
    neighbors.push({ x: c.x + 1, y: c.y, z: c.z })
    neighbors.push({ x: c.x, y: c.y - 1, z: c.z })
    neighbors.push({ x: c.x, y: c.y + 1, z: c.z })
    neighbors.push({ x: c.x, y: c.y, z: c.z - 1 })
    neighbors.push({ x: c.x, y: c.y, z: c.z + 1 })
    return neighbors
}

interface Boundary {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    minZ: number;
    maxZ: number;
}


const part2 = (cubes: Cube[]): number => {
    let freeAirCubes: Record<string, boolean> = {}

    let bound: Boundary = {
        minX: Infinity,
        maxX: -Infinity,
        minY: Infinity,
        maxY: -Infinity,
        minZ: Infinity,
        maxZ: -Infinity,
    }

    let processedCubes: Record<string, Cube> = {};

    cubes.forEach(c => {
        processedCubes[cubeString(c)] = c
        if (c.x < bound.minX) {
            bound.minX = c.x
        }
        if (c.x > bound.maxX) {
            bound.maxX = c.x
        }
        if (c.y < bound.minY) {
            bound.minY = c.y
        }
        if (c.y > bound.maxY) {
            bound.maxY = c.y
        }
        if (c.z < bound.minZ) {
            bound.minZ = c.z
        }
        if (c.z > bound.maxZ) {
            bound.maxZ = c.z
        }
    })


    //adjustment for border check to work
    bound.minX = bound.minX - 1
    bound.maxX = bound.maxX + 1
    bound.minY = bound.minY - 1
    bound.maxY = bound.maxY + 1
    bound.minZ = bound.minZ - 1
    bound.maxZ = bound.maxZ + 1



    let currentlyChecking: Record<string, boolean> = {}
    const walk = (cube: Cube): boolean => {
        let cstr = cubeString(cube)
        if (freeAirCubes[cstr] !== undefined) {
            return freeAirCubes[cstr]
        }
        if (processedCubes[cstr]) {
            freeAirCubes[cstr] = false
            return false
        }

        if (cube.x <= bound.minX ||
            cube.x >= bound.maxX ||
            cube.y <= bound.minY ||
            cube.y >= bound.maxY ||
            cube.z <= bound.minZ ||
            cube.z >= bound.maxZ) {
            freeAirCubes[cstr] = true
            return true
        }

        //90% sure the error is here
        let neighbors = getNeighborCubes(cube)
        for (let i = 0; i < neighbors.length; i++) {
            let n = neighbors[i]
            if (!currentlyChecking[cubeString(n)] && !processedCubes[cubeString(n)]) {
                currentlyChecking[cubeString(n)] = true
                if (walk(n)) {
                    freeAirCubes[cstr] = true
                    Object.keys(currentlyChecking).forEach(s => {
                        freeAirCubes[s] = true
                        delete currentlyChecking[s]
                    })
                    return true
                } else {
                    currentlyChecking[cubeString(n)] = false
                }
            }
        }
        Object.keys(currentlyChecking).forEach(s => {
            freeAirCubes[s] = false
            delete currentlyChecking[s]
        })
        return false
    }


    // for (let x = bound.minX; x <= bound.maxX; x++) {
    //     for (let y = bound.minY; y <= bound.maxY; y++) {
    //         for (let z = bound.minZ; z <= bound.maxZ; z++) {
    //             walk({ x, y, z })
    //         }
    //     }
    // }
    cubes.forEach(c => {
        let neighbors = getNeighborCubes(c)
        neighbors.forEach(n => {
            walk(n)
        })
    })

    let total = 0

    cubes.forEach(c => {
        let neighbors = getNeighborCubeStrings(c)
        neighbors.forEach(n => {
            if (freeAirCubes[n]) {
                total++
            }
        })
    })
    return total
}

export {
    parseInput,
    part1,
    part2
}

