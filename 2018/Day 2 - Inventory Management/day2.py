import string

boxListFile = open("input.txt")
boxList = []
for line in boxListFile:
    boxList.append(line.rstrip())
boxListFile.close()

print(boxList)

alpha = string.ascii_lowercase

twiceBoxes = 0
thriceBoxes = 0

for box in boxList:
    lettersArray = [0]*26
    for letter in box:
        lettersArray[alpha.find(letter)] += 1
    for i in lettersArray:
        if i == 2:
            twiceBoxes += 1
            break
    for i in lettersArray:
        if i == 3:
            thriceBoxes += 1
            break

print("Checksum is", twiceBoxes*thriceBoxes)

for a in range(len(boxList)-1):
    for b in range(a+1, len(boxList)):
        mismatchedLetterCount = 0
        mismatchIndex = 0
        for i in range(len(boxList[a])):
            if not boxList[a][i] == boxList[b][i]:
                mismatchedLetterCount += 1
                mismatchIndex = i
        if mismatchedLetterCount == 1:
            first, second, m_index= a, b, mismatchIndex

print(boxList[first][:m_index]+boxList[first][(m_index+1):])
print(boxList[second][:m_index]+boxList[second][(m_index+1):])




