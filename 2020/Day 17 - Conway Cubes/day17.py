cubeFile = open("input.txt")
initialState = []
cubeStates = {}
for line in cubeFile:
    initialState.append(line.rstrip())

for y in range(len(initialState)):
    for x in range(len(initialState[y])):
        cubeStates[x, y, 0, 0] = (initialState[x][y] == "#")

cubeFile.close()


def printState(states):
    list_of_x = []
    list_of_y = []
    list_of_z = []
    for k in states:
        if k[0] not in list_of_x:
            list_of_x.append(k[0])
        if k[1] not in list_of_y:
            list_of_y.append(k[1])
        if k[2] not in list_of_z:
            list_of_z.append(k[2])
    list_of_x.sort()
    list_of_y.sort()
    list_of_z.sort()
    for z in list_of_z:
        print("z =", z)
        for x in list_of_x:
            stringToPrint = ""
            for y in list_of_y:
                try:
                    if states[x, y, z]:
                        stringToPrint += "#"
                    else:
                        stringToPrint += "."
                except:
                    stringToPrint += "."
            print(stringToPrint)
    return None


def iterateCubeStates():
    tempStates = cubeStates.copy()
    list_of_x = []
    list_of_y = []
    list_of_z = []
    list_of_w = []
    for k in cubeStates:
        if k[0] not in list_of_x and cubeStates.get(k):
            list_of_x.append(k[0])
        if k[1] not in list_of_y and cubeStates.get(k):
            list_of_y.append(k[1])
        if k[2] not in list_of_z and cubeStates.get(k):
            list_of_z.append(k[2])
        if k[3] not in list_of_w and cubeStates.get(k):
            list_of_w.append(k[3])
    list_of_x.sort()
    list_of_y.sort()
    list_of_z.sort()
    list_of_w.sort()
    minx = min(list_of_x)
    maxx = max(list_of_x)
    miny = min(list_of_y)
    maxy = max(list_of_y)
    minz = min(list_of_z)
    maxz = max(list_of_z)
    minw = min(list_of_w)
    maxw = max(list_of_w)

    for x in range(minx - 1, maxx + 2):
        for y in range(miny - 1, maxy + 2):
            for z in range(minz - 1, maxz + 2):
                for w in range(minw -1, maxw +2):
                    neighborCount = 0
                    try:
                        if cubeStates[x, y, z, w]:  # remove the double-counted self reference
                            neighborCount -= 1
                    except:
                        pass
                    for a in [-1, 0, 1]:
                        for b in [-1, 0, 1]:
                            for c in [-1, 0, 1]:
                                for e in [-1,0,1]:
                                    if (x + a, y + b, z + c,w+e) in cubeStates.keys():
                                        if cubeStates[x + a, y + b, z + c,w+e]:
                                            neighborCount += 1
                    if (x, y, z,w) in cubeStates.keys():
                        if cubeStates[x, y, z,w]:
                            if neighborCount == 2 or neighborCount == 3:
                                continue
                            else:
                                tempStates[x, y, z,w] = False
                        else:
                            if neighborCount == 3:
                                tempStates[x, y, z,w] = True
                    else:
                        if neighborCount == 3:
                            tempStates[x, y, z,w] = True
    return tempStates


for i in range(6):
    cubeStates = iterateCubeStates()

activeCubeCount = 0
for k in cubeStates:
    if cubeStates.get(k):
        activeCubeCount += 1
print("Active cube count is", activeCubeCount)
