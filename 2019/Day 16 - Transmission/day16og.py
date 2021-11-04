import math

def singlePhase(inputArray, patternArray):
    result = []

    for a in range(len(inputArray)):


        # build full pattern array
        fullPatternArray = []
        currentPatternArrayIndex = 0
        while len(fullPatternArray) <= len(inputArray):
            for b in range(a+1):
                fullPatternArray.append(patternArray[currentPatternArrayIndex])
            currentPatternArrayIndex += 1
            if currentPatternArrayIndex == len(patternArray):
                currentPatternArrayIndex = 0

        #remove the first element
        fullPatternArray.pop(0)

        resultSum = 0
        #find sum
        for k in range(len(inputArray)):
            resultSum += inputArray[k]*fullPatternArray[k]

        result.append(abs(resultSum)%10)

    return result


puzzleInputFile = open("input.txt")
line = puzzleInputFile.readline().rstrip()

line = "03036732577212944063491565474664"

inputArray = []
for i in range(len(line)):
    inputArray.append(int(line[i]))
puzzleInputFile.close()


patternArray = [0, 1, 0, -1]


fullInputArray = []
#compose message to repeat
for i in range(10000):
    fullInputArray += inputArray

offsetString = ""
for k in range(7):
    offsetString += str(fullInputArray[k])

messageOffset = int(offsetString)
print(messageOffset)

for k in range(100):
    fullInputArray = singlePhase(fullInputArray, patternArray)
    print(k)



print(fullInputArray[messageOffset:messageOffset+8])