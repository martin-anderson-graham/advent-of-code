coordinateFile = open("input.txt")
coordinates = []
for line in coordinateFile:
    temp = line.rstrip().split(",")
    coordinates.append([int(temp[0]), int(temp[1])])
coordinateFile.close()


def getManhattanDistance(coordinateOneArray, coordinateTwoArray):
    x = coordinateOneArray[0] - coordinateTwoArray[0]
    y = coordinateOneArray[1] - coordinateTwoArray[1]
    return (abs(x) + abs(y))


maxX = 0
maxY = 0

for c in coordinates:
    if c[0] > maxX:
        maxX = c[0]
    if c[1] > maxY:
        maxY = c[1]

closestPointList = []
for a in range(maxX + 5):
    closestPointList.append([])
    for b in range(maxY + 5):
        closestPointList[a].append(0)

for x in range(maxX + 5):
    for y in range(maxY + 5):
        tempMinManhattanDistance = 1000000000
        for c_index in range(len(coordinates)):
            if getManhattanDistance([x, y], coordinates[c_index]) < tempMinManhattanDistance:
                tempMinManhattanDistance = getManhattanDistance([x, y], coordinates[c_index])
                closestPointList[x][y] = c_index

validPoints = []
for a in range(len(coordinates)):
    validPoints.append(a)

# first guess - anything touching an edge is a no-go
for a in closestPointList[0]:
    if a in validPoints:
        validPoints.remove(a)
for a in closestPointList[len(closestPointList) - 1]:
    if a in validPoints:
        validPoints.remove(a)
for a in closestPointList:
    if a[0] in validPoints:
        validPoints.remove(a[0])
    if a[len(a) - 1] in validPoints:
        validPoints.remove(a[len(a) - 1])

maxCount = 0

for a in validPoints:
    count = 0
    for x in closestPointList:
        for y in x:
            if y == a:
                count += 1
    if count > maxCount:
        maxCount = count

print("First star - The best count is", maxCount)

closestPointList2 = []
for a in range(maxX + 5):
    closestPointList2.append([])
    for b in range(maxY + 5):
        closestPointList2[a].append(0)

for x in range(maxX + 5):
    for y in range(maxY + 5):
        if closestPointList2[x][y] > 10000:
            continue
        for c_index in range(len(coordinates)):
            closestPointList2[x][y] += getManhattanDistance([x, y], coordinates[c_index])
count2 = 0
for x in closestPointList2:
    for y in x:
        if y < 10000:
            count2 += 1

print("Second star - region size is", count2)
