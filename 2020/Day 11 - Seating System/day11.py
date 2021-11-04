seatFile = open("input.txt")
seats = []

# 0=floor, 1=unoccupied, 2=occupied
currentIndex = 0
for line in seatFile:
    seats.append([])
    for a in line.rstrip():
        if a == ".":
            seats[currentIndex].append(0)
        else:
            seats[currentIndex].append(1)
    currentIndex += 1

seatFile.close()


def occupiedSeatCount(seatArray):
    count = 0
    for a in seatArray:
        for b in a:
            if b == 2:
                count += 1
    return count


def iterateSeats(seatArray):
    result = []
    for l in seatArray:
        result.append(l.copy())
    change = False
    for r in range(len(seatArray)):
        for c in range(len(seatArray[r])):
            if seatArray[r][c] == 0:
                continue
            else:
                offsetArray = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
                if r == 0:
                    try:
                        offsetArray.remove([-1, -1])
                    except:
                        pass
                    try:
                        offsetArray.remove([-1, 0])
                    except:
                        pass
                    try:
                        offsetArray.remove([-1, 1])
                    except:
                        pass
                if r == len(seatArray) - 1:
                    try:
                        offsetArray.remove([1, -1])
                    except:
                        pass
                    try:
                        offsetArray.remove([1, 0])
                    except:
                        pass
                    try:
                        offsetArray.remove([1, 1])
                    except:
                        pass
                if c == 0:
                    try:
                        offsetArray.remove([-1, -1])
                    except:
                        pass
                    try:
                        offsetArray.remove([0, -1])
                    except:
                        pass
                    try:
                        offsetArray.remove([1, -1])
                    except:
                        pass
                if c == len(seatArray[r]) - 1:
                    try:
                        offsetArray.remove([-1, 1])
                    except:
                        pass
                    try:
                        offsetArray.remove([0, 1])
                    except:
                        pass
                    try:
                        offsetArray.remove([1, 1])
                    except:
                        pass

                occupiedNeighborCount = 0
                for offset in offsetArray:
                    offsetCounter = 1
                    offsetR = r + offsetCounter * offset[0]
                    offsetC = c + offsetCounter * offset[1]

                    while 0 <= offsetR < len(seatArray) and 0 <= offsetC < len(seatArray[r]):
                        if seatArray[offsetR][offsetC] == 1:
                            break
                        elif seatArray[offsetR][offsetC] == 2:
                            occupiedNeighborCount += 1
                            break
                        offsetCounter += 1
                        offsetR = r + offsetCounter * offset[0]
                        offsetC = c + offsetCounter * offset[1]

                if seatArray[r][c] == 1 and occupiedNeighborCount == 0:
                    result[r][c] = 2
                    change = True
                elif seatArray[r][c] == 2 and occupiedNeighborCount >= 5:
                    result[r][c] = 1
                    change = True
    return result, change


changing = True
while changing:
    seats, changing = iterateSeats(seats)

print("# of occupied seats is", occupiedSeatCount(seats))
