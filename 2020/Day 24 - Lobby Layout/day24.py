instructionFile = open("input.txt")
instructionList = []

instructionIndex = 0
for line in instructionFile:
    instructionList.append(line.rstrip())

instructionFile.close()
print(len(instructionList))


def parseInstructionLine(line):
    r = 0
    c = 0
    index = 0
    while index < len(line):
        if line[index] == "e":
            c -= 2
            index += 1
        elif line[index] == "w":
            c += 2
            index += 1
        else:
            dir = line[index:index + 2]
            if dir == "ne":
                r -= 1
                c -= 1
            elif dir == "se":
                r += 1
                c -= 1
            elif dir == "nw":
                r -= 1
                c += 1
            elif dir == "sw":
                r += 1
                c += 1
            index += 2
    return str(r) + "," + str(c)


def iterateFlips(state):
    tilesToFlip = []
    newState = {}

    return newState


tileState = {}

for i in instructionList:
    result = parseInstructionLine(i)
    if result not in tileState:
        tileState[result] = 1
    else:
        if tileState[result] == 1:
            tileState[result] = 0
        else:
            tileState[result] = 1

for i in range(100):
    tileState = iterateFlips(tileState)

blackCount = 0
for key in tileState:
    if tileState.get(key) == 1:
        blackCount += 1

print("Result is", blackCount, "black tiles")
