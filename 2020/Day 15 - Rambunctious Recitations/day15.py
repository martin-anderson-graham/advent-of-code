numbers = [5, 2, 8, 16, 18, 0, 1]
#numbers = [0, 3, 6]
numbersDict = {}

roundCount = len(numbers)

# seed the startingnumbers
for n in range(len(numbers)):
    numbersDict[numbers[n]] = [n + 1, 0]

currentNumber = 0
while roundCount < 30000000 - 1:
    roundCount += 1
    if currentNumber in numbersDict.keys():
        numbersDict[currentNumber] = [roundCount, numbersDict[currentNumber][0]]
        currentNumber = numbersDict[currentNumber][0] - numbersDict[currentNumber][1]
    else:
        numbersDict[currentNumber] = [roundCount, 0]
        currentNumber = 0

print("Result is", currentNumber)
