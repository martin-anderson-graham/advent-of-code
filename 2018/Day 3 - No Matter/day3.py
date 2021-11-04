claimFile = open("input.txt")
claims = {}  #key is id, value is [x,y,w,h]
for line in claimFile:
    tempClaim = line.split(" ")
    tempLocation = tempClaim[2].split(",")
    tempSize = tempClaim[3].split("x")
    claims[int(tempClaim[0][1:])] = [int(tempLocation[0]), int(tempLocation[1][:-1]), int(tempSize[0]), int(tempSize[1])]
claimFile.close()

cloth = []
for a in range(1000):
    cloth.append([])
    for b in range(1000):
        cloth[a].append(0)

for claimKey in claims:
    x, y, w, h = claims.get(claimKey)
    for a in range(x, x+w):
        for b in range(y, y+h):
            cloth[a][b] += 1

overlapSquares = 0
for line in cloth:
    for k in line:
        if k>1:
            overlapSquares += 1

for claimKey in claims:
    noOverLap = True
    x, y, w, h = claims.get(claimKey)
    for a in range(x, x+w):
        for b in range(y, y+h):
            if cloth[a][b] != 1:
                noOverLap = False
    if noOverLap:
        print("The non-overlapping claim is",claimKey)

print("Total number of overlapped squares",overlapSquares)


