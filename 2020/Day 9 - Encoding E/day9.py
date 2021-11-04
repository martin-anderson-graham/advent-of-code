numberFile = open("input.txt")
numbers = []
for line in numberFile:
    numbers.append(int(line.rstrip()))

preambleLength = 62
validPriors = []

for i in range(preambleLength):
    validPriors.append(numbers[i])

index = preambleLength
invalidNumber = 0

while index < len(numbers):
    valid = False
    for a in validPriors:
        for b in validPriors:
            if a + b == numbers[index]:
                valid = True
    if valid:
        validPriors.pop(0)
        validPriors.append(numbers[index])
        index += 1
    else:
        invalidNumber = numbers[index]
        break

print(invalidNumber)

for lengthOfSum in range(2, len(numbers)):
    for first in range(0, len(numbers)-lengthOfSum):
        tempSum = 0
        for n in range(first, first+lengthOfSum):
            tempSum += numbers[n]
        if tempSum == invalidNumber:
            break
    else:
        continue
    break

resultArray = []
for a in range(first, first+lengthOfSum):
    resultArray.append(numbers[a])

print("Sum of largest and smallest is", max(resultArray)+min(resultArray))

