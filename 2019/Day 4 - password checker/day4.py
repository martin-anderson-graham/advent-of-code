
inputlow=193651
inputhigh=649729

def passwordChecker(num):
    strnum=str(num)
    digitList=[]
    digitCount=[]
    for i in range(10):
        digitCount.append(0)
    for a in range(len(strnum)):
        digitList.append(strnum[a])
    for a in digitList:
        digitCount[int(a)]+=1

    repeatedDigits=False
    for k in digitCount:
        if k==2:
            repeatedDigits=True


    if len(strnum)!=6:
        return False


    notDecreasing=True
    for a in range(len(strnum)-1):
        if int(strnum[a])>int(strnum[a+1]):
            notDecreasing=False
    if not repeatedDigits or not notDecreasing:
        return False

    return True



numValidPasswords=0
for k in range(inputlow,inputhigh+1):
    if passwordChecker(k):
        numValidPasswords+=1

print("Number of valid passwords is ",numValidPasswords)
