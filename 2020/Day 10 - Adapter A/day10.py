def isValidSet(adapterArray, nJoltage): #assumes a sorted adapterarray
    if nJoltage - max(adapterArray) > 3:
        return False
    cJoltage = 0

    for k in adapterArray:
        if k - cJoltage > 3: #checks
            return False
        cJoltage = k
    return True

def generateDifferencesArray(adapterArray):
    result = [adapterArray[0]]
    for a in range(1, len(adapterArray)):
        result.append(adapterArray[a]-adapterArray[a-1])
    result.append(3)
    return result

def generateMustHaveIndices(differenceArray):
    result = []
    for d in range(len(differenceArray)):
        if differenceArray[d] == 3:
            result.append(d)
            result.append(d-1)
    runOfOnes = 0
    for i in range(len(differenceArray)):
        if differenceArray[i] == 1:
            runOfOnes += 1
        elif differenceArray[i] == 3:
            if runOfOnes == 1:
                result.append(i-1)
            runOfOnes = 0
    return sorted(result)





joltageFile = open("input.txt")
joltages = []

for line in joltageFile:
    joltages.append(int(line.rstrip()))

joltageFile.close()

joltages.sort()

currentJoltage = 0
countArray = [0, 0, 1]


for j in joltages:
    countArray[j - currentJoltage - 1] += 1
    currentJoltage = j

print("First Result is", countArray[0]*countArray[2])

differences = generateDifferencesArray(joltages)

#print(differences)
mustHaveAdapterIndices = generateMustHaveIndices(differences)

printArray = []
for k in range(len(joltages)):
    if k in mustHaveAdapterIndices:
        printArray.append(int(str(8)*len(str(joltages[k]))))
    else:
        printArray.append(int(str(1)*len(str(joltages[k]))))

count = 1
if mustHaveAdapterIndices[0] == 0:
    runOfOnes = 0
else:
    runOfOnes = mustHaveAdapterIndices[0]

for k in range(1, len(mustHaveAdapterIndices)):
    if runOfOnes == 1:
        count *= 2
    elif runOfOnes == 2:
        count *= 4
    elif runOfOnes == 3:
        count *= 7
    elif runOfOnes == 4:
        count *= 7
    runOfOnes = (mustHaveAdapterIndices[k] - mustHaveAdapterIndices[k - 1] - 1)

print("Number of valid arrangements is", count, "Length of count is", len(str(count)))
