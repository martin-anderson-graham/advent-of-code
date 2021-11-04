import string

questionsFile=open("input.txt")
responseArray=[[]]
currentIndex=0
for f in questionsFile:
    if f=='\n':
        responseArray.append([])
        currentIndex+=1
    else:
        responseArray[currentIndex].append(f.rstrip())
questionsFile.close()

alphabet=string.ascii_lowercase

def questionCount(responseList):
    countArray=[0]*26
    numberOfEntries=len(responseList)
    for form in responseList:
        for letter in form:
            countArray[alphabet.find(letter)] +=1
    count=0
    for k in countArray:
        if k==numberOfEntries:
            count+=1
    return count

totalCount=0
for a in responseArray:
    totalCount+=questionCount(a)
print("Total question count is ",totalCount)



