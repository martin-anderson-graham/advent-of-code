import re

problemFile = open("input.txt")
problems = []
for line in problemFile:
    problems.append(line.rstrip())

problemFile.close()


def evaluateFirst(prob):
    result = 0

    while "(" in prob or ")" in prob:
        # print(prob)
        parensCount = 0
        firstParensIndex = 0
        foundFirst = False
        for i in range(len(prob)):
            if prob[i] == '(' and not foundFirst:
                foundFirst = True
                firstParensIndex = i
                parensCount += 1
            elif prob[i] == '(':
                parensCount += 1
            if prob[i] == ')':
                parensCount -= 1
                if parensCount == 0:
                    # print(prob[firstParensIndex+1:i])
                    prob = prob[:firstParensIndex] + evaluateFirst(prob[firstParensIndex + 1:i]) + prob[i + 1:]
                    # print(prob)
                    break

    probArray = prob.split(" ")
    # print(probArray)
    while len(probArray) > 1:
        if probArray[1] == "+":
            tempResult = int(probArray[0]) + int(probArray[2])
        elif probArray[1] == "*":
            tempResult = int(probArray[0]) * int(probArray[2])
        probArray = probArray[3:]
        probArray.insert(0, str(tempResult))
        # print(probArray)
    return str(probArray[0])


def evaluateSecond(prob):
    result = 0

    while "(" in prob or ")" in prob:
        # print(prob)
        parensCount = 0
        firstParensIndex = 0
        foundFirst = False
        for i in range(len(prob)):
            if prob[i] == '(' and not foundFirst:
                foundFirst = True
                firstParensIndex = i
                parensCount += 1
            elif prob[i] == '(':
                parensCount += 1
            if prob[i] == ')':
                parensCount -= 1
                if parensCount == 0:
                    # print(prob[firstParensIndex+1:i])
                    prob = prob[:firstParensIndex] + evaluateSecond(prob[firstParensIndex + 1:i]) + prob[i + 1:]
                    # print(prob)
                    break

    probArray = prob.split(" ")
    #print(probArray)
    while "+" in probArray:
        index = probArray.index("+")
        tempResult = int(probArray[index - 1]) + int(probArray[index + 1])
        probArray = probArray[:index - 1] + probArray[index + 2:]
        probArray.insert(index-1, str(tempResult))
        #print(probArray)
    while len(probArray) > 1:
        tempResult = int(probArray[0]) * int(probArray[2])
        probArray = probArray[3:]
        probArray.insert(0,tempResult)
        #print(probArray)
    return str(probArray[0])


sum = 0
for p in problems:
    sum += int(evaluateFirst(p))

print("First sum of solutions is", sum)

sum = 0
for p in problems:
    r = int(evaluateSecond(p))
    #print(r)
    sum += r

print("Second sum of solutions is", sum)
