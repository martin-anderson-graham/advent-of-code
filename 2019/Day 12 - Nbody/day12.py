from operator import add
from math import gcd

class System:
    def __init__(self, coordinatesArray):
        self.bodyArray = []
        for c in range(len(coordinatesArray)):
            self.bodyArray.append(Body(coordinatesArray[c], c))

    def timeStep(self):
        for a in self.bodyArray:
            for b in self.bodyArray:
                if a.id != b.id:
                    a.applyGravity(b.location)
        for a in self.bodyArray:
            a.updatePosition()


    def __str__(self):
        result = ""
        for a in self.bodyArray:
            result += str(a)
            result += "\n"
        return result

    def getTotalEnergy(self):
        totalEnergy = 0
        for a in self.bodyArray:
            totalEnergy += a.getPotentialEnergy() * a.getKineticEnergy()
        return totalEnergy

    def find1dCycleTime(self, dimensionChar):
        result = 0
        p = []
        v = []
        for k in self.bodyArray:
            p.append(k.location[dimensionChar])
            v.append(0)
        op = p.copy()
        searching = True
        while searching:
            result += 1
            for a in range(len(p)):
                for b in range(len(p)):
                    if a != b:
                        if p[a] < p[b]:
                            v[a] += 1
                        elif p[a] > p[b]:
                            v[a] -= 1
            for i in range(len(p)):
                p[i] = v[i] + p[i]
            searching = False
            for i in range(len(p)):
                if v[i] != 0:
                    searching = True
                    break
                if p[i] != op[i]:
                    searching = True
                    break


        return result

    def findTotalCycleTime(self):
        dimensions = ['x', 'y', 'z']
        cycles = []
        for d in dimensions:
            cycles.append(self.find1dCycleTime(d))

        temp = cycles[0] * cycles [1] // gcd(cycles[0], cycles[1])
        result = cycles[2] * temp // gcd(cycles[2], temp)
        return result


class Body:
    def __init__(self, unparsedCoordinateString, id):
        parsedArray = self.parseVector(unparsedCoordinateString)
        self.location = {
            'x': parsedArray[0],
            'y': parsedArray[1],
            'z': parsedArray[2]
        }
        self.originalLocation = self.location.copy()
        self.velocity = {
            'x': 0,
            'y': 0,
            'z': 0
        }
        self.id = id

    def applyGravity(self, otherBodyLocationDict):
        for k in self.location.keys():
            if self.location[k] < otherBodyLocationDict[k]:
                self.velocity[k] += 1
            elif self.location[k] > otherBodyLocationDict[k]:
                self.velocity[k] -= 1

    def updatePosition(self):
        for k in self.location.keys():
            self.location[k] += self.velocity[k]

    def parseVector(self, stringInput):
        result = []
        inputArray = stringInput.lstrip('<').rstrip('>').split(", ")
        for i in range(3):
            result.append(int(inputArray[i][2:]))
        return result

    def __str__(self):
        result = ""
        for a in self.location.values():
            result += str(a)
            result += " "
        return result

    def getPotentialEnergy(self):
        return(abs(self.location['x']) + abs(self.location['y']) + abs(self.location['z']))

    def getKineticEnergy(self):
        return(abs(self.velocity['x']) + abs(self.velocity['y']) + abs(self.velocity['z']))



userInput = ""
puzzleInput = open("C:/Users/agraham/Google Drive/Spare Time/Python/AdventOfCode/Day 12 - Nbody/input"+userInput+".txt")
coordinates = []
for a in puzzleInput.readlines():
    coordinates.append(a.rstrip())
puzzleInput.close()


world = System(coordinates)

print(world.findTotalCycleTime())









