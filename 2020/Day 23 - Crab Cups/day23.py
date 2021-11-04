cupString = "389125467"
cups = []
for a in range(len(cupString)):
    cups.append(int(cupString[a]))

index = max(cups)+1
while len(cups)<1000000:
    cups.append(index)
    index += 1


def round(cupList, currentCup):
    tempCupList = []
    if currentCup < len(cupList) - 3:
        removedCups = cupList[currentCup + 1:currentCup + 4]
        listA = cupList[0:currentCup + 1]
        listB = cupList[currentCup + 4:]

    else:
        listA = cupList[4 - len(cupList) + currentCup:currentCup + 1]
        removedCups = cupList[currentCup + 1:] + cupList[0:4 - len(cupList) + currentCup]
        listB = []
    destinationCup = cupList[currentCup] - 1
    if destinationCup < min(cupList):
        destinationCup = max(cupList)
    while destinationCup in removedCups:
        destinationCup -= 1
        if destinationCup < min(cupList):
            destinationCup = max(cupList)
    tempCupList = listA + listB

    destinationIndex = tempCupList.index(destinationCup)
    tempCupList = tempCupList[0:destinationIndex + 1] + removedCups + tempCupList[destinationIndex + 1:]
    ##print(tempCupList,destinationCup, removedCups)
    return tempCupList

def formatResult(inputList):
    resultString = ""
    startIndex =inputList.index(1)+1
    for i in range(len(inputList)-1):
        resultString += str(inputList[startIndex])
        startIndex+=1
        if startIndex >= len(inputList):
            startIndex = 0
    return resultString


def formatResultSecond(inputList):
    product = 1
    product *=  inputList.index(1) + 1
    product *= inputList.index(1)+2
    return product
currentIndex = 0

for i in range(10000000):
    print(i)
    currentLabel = cups[currentIndex]
    cups=round(cups, currentIndex)
    currentIndex = cups.index(currentLabel)+1
    if currentIndex >= len(cups):
        currentIndex = 0

print(formatResultSecond(cups))
