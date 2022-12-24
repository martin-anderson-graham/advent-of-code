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

function cubeFaceCanEscape(cstr: string, processedCubes: Record<string, Cube>): boolean {

    return true
}

function countCubeFacesThatCanEscape(c: Cube, processedCubes: Record<string, Cube>): number {
    let total = 0
    let neighbors = getNeighborCubeStrings(c)
    neighbors.forEach(n => {
        if (cubeFaceCanEscape(n, processedCubes)) {
            total += 1
        }
    })
    return total
}

//new idea - make a hash of cubes whether than can escape
//make an object hold min/max x,y,z to tell if escape occured
//make a queue (or recursive?) to check neighbors if they can escape
//do a last pass through cubes and their neighbors and check against escape hash
const part2 = (cubes: Cube[]): number => {
    let total = 0

    let processedCubes: Record<string, Cube> = {};

    cubes.forEach(c => {
        processedCubes[cubeString(c)] = c
    })

    cubes.forEach(c => {
        total += countCubeFacesThatCanEscape(c, processedCubes)
    })

    return total
}

export {
    parseInput,
    part1,
    part2
}

