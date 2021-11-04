
def singlePhase(inputString):
    result = ""

    for a in range(len(inputString)):
        currentDigitSum = 0
        currentDigitIndex = 0
        currentPatternString = ""
        fullPatternString = ""
        #implied pattern array
        while len(fullPatternString) <= len(inputString):
            #build currentPatternString once, without repeats, treat 2 as -1
            while currentDigitIndex <= 4*a +3:
                if currentDigitIndex > a  and currentDigitIndex <= 2*a + 1:
                    currentPatternString += '1'
                elif currentDigitIndex > 3*a + 2 and currentDigitIndex <= 4*a + 3:
                    currentPatternString += '2'
                else:
                    currentPatternString += '0'
                currentDigitIndex += 1
            fullPatternString = fullPatternString + currentPatternString
        #remove first 0
        fullPatternString = fullPatternString[1:]
        for i in range(len(inputString)):
            if fullPatternString[i] == '1':
                currentDigitSum += int(inputString[i])
            elif fullPatternString[i] == '2':
                currentDigitSum -= int(inputString[i])
        result += str(abs(currentDigitSum)%10)
    return result


puzzleInputFile = open("input.txt")
#puzzleInputFile = open("E:/Google Drive/Spare Time/Python/AdventOfCode/Day 16 - Transmission/input.txt")
inputString = puzzleInputFile.readline().rstrip()
puzzleInputFile.close()


for k in range(100):
    inputString = singlePhase(inputString)
    print(k)

print(inputString[:8])


