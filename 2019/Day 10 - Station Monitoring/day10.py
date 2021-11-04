import math

def printVisibleArray(inputArray): # to help me see arrays oriented properly
    cCount=0
    for y in range(len(inputArray[0])):
        line=""
        for x in range(len(inputArray)):
            line += str(inputArray[x][y])+" "
        print(line)
    return None

def countAsteroids(x,y, asteroidArray): # counts asteroids visible to given asteroid at x,y - 0 if position is occupied
    count = 0
    if asteroidArray[x][y] == '.':
        return count

    visibleAsteroidsSlopes = {} #dict - key is slope, array of letters to keep track of direction along line
    for a in range(len(asteroidArray)):
        for b in range(len(asteroidArray[x])):
            if asteroidArray[a][b] == '#':
                try:
                    slope = (y - b) / (x - a)
                except:
                    slope = "und"
                if slope not in visibleAsteroidsSlopes.keys():
                    if b > y:
                        visibleAsteroidsSlopes[slope] = ["u"]
                    elif b < y:
                        visibleAsteroidsSlopes[slope] = ["d"]
                    elif b == y:
                        if a < x:
                            visibleAsteroidsSlopes[slope] = ["u"]
                        elif a > x:
                            visibleAsteroidsSlopes[slope] = ["d"]
                elif slope in visibleAsteroidsSlopes.keys():
                    if b > y:
                        if "u" not in visibleAsteroidsSlopes[slope]:
                            visibleAsteroidsSlopes[slope].append("u")
                    elif b < y:
                        if "d" not in visibleAsteroidsSlopes[slope]:
                            visibleAsteroidsSlopes[slope].append("d")
                    elif b == y:
                        if a < x:
                            if "u" not in visibleAsteroidsSlopes[slope]:
                                visibleAsteroidsSlopes[slope].append("u")
                        if a > x:
                            if "d" not in visibleAsteroidsSlopes[slope]:
                                visibleAsteroidsSlopes[slope].append("d")
    for k in visibleAsteroidsSlopes.keys():
        count += len(visibleAsteroidsSlopes[k])


    return count

def countAllVisibleAsteroids(asteroidArray): #take a 2d symbolic array, returns a 2d array of visible asteroid counts
    result=[]
    for a in range(len(asteroidArray)):
        result.append([])
        for b in range(len(asteroidArray[a])):
            result[a].append(0)

    for x in range(len(result)):
        for y in range(len(result[x])):
            result[x][y] = countAsteroids(x,y,asteroidArray)
    return result

def maxCount(inputArray):  # takes a 2d array, returns max value and its location
    max = 0
    a = 0
    b = 0
    for x in range(len(inputArray)):
        for y in range(len(inputArray[x])):
            if inputArray[x][y] > max:
                max = inputArray[x][y]
                a = x
                b = y

    return max, a, b

def destroyVisibleAsteroids(asteroidArray, x, y):
    numDestroyed = 0
    visibleAsteroidAngles = {}  # dict - key is angle, array of coordinates to find closest one on line
    for a in range(len(asteroidArray)):
        for b in range(len(asteroidArray[a])):
            if asteroidArray[a][b] == '.' or (a==x and b==y):
                continue
            dx = a - x  # these orderings are to make the coordinate geometry match relative positions
            dy = y - b
            angle = angleConversion(dx, dy)
            if angle not in visibleAsteroidAngles.keys():
                visibleAsteroidAngles[angle] = [a, b]
            else:
                if distance([a,b],[x,y]) < distance(visibleAsteroidAngles[angle],[x,y]):
                    visibleAsteroidAngles[angle] = [a, b]

    asteroidsToRemoveKeys = []
    for k in visibleAsteroidAngles.keys():
        asteroidsToRemoveKeys.append(k)
    asteroidsToRemoveKeys.sort()

    asteroidsToRemove = []
    for a in asteroidsToRemoveKeys:
        asteroidsToRemove.append(visibleAsteroidAngles[a])

    for a in asteroidsToRemove:
        asteroidArray[a[0]][a[1]] = '.'
        numDestroyed += 1
        if numDestroyed == 200:
            print("200th asteroid destroyed is at (", a[0], ",", a[1], ")")
            print("Answer is", a[0]*100+a[1])
    return numDestroyed, asteroidArray

def distance(coordinateArray, stationArray):
    dx = coordinateArray[0] - stationArray[0]
    dy = coordinateArray[1] - stationArray[1]
    return math.sqrt(math.pow(dx, 2)+math.pow(dy, 2))

def angleConversion(dx, dy): #to convert to the angle orientation specified by the problem
    angle = math.atan2(dy, dx)
    if angle <= math.pi / 2:
        angle = math.pi / 2 - angle
    else:
        angle = 5 * math.pi / 2 - angle
    return angle

usePuzzle=""
puzzleInput=open(
"C:/Users/agraham/Google Drive/Spare Time/Python/AdventOfCode/Day 10 - Station Monitoring/input"+usePuzzle+".txt"
)



rawInput=[]
# array of lines - we are going to make input so x,y works more naturally
for line in puzzleInput.readlines():
    rawInput.append(line.rstrip())

input=[]
for cCount in range(len(rawInput[0])):
    input.append([])
    for l in rawInput:
        input[cCount].append(l[cCount])

puzzleInput.close()
aArray = input.copy()

numDestroyed = 0

stationLoc = maxCount(countAllVisibleAsteroids(aArray))[1:]

while numDestroyed < 200:
    numDestroyed, aArray = destroyVisibleAsteroids(aArray, stationLoc[0], stationLoc[1])

