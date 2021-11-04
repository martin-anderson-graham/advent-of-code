boardingPassFile=open("input.txt")
boardingPasses=[]
for f in boardingPassFile:
    boardingPasses.append(f.rstrip())
boardingPassFile.close()

def rangeGivenFB(rangeArray,letter):
    returnRange=rangeArray
    if letter=="F":
        returnRange[1]=(returnRange[1]+returnRange[0]-1)/2
    if letter=="B":
        returnRange[0]=(returnRange[1]+returnRange[0]+1)/2
    return returnRange

def rangeGivenLR(rangeArray,letter):
    returnRange=rangeArray
    if letter=="L":
        returnRange[1] = (returnRange[1] + returnRange[0] - 1) / 2
    if letter=="R":
        returnRange[0] = (returnRange[1] + returnRange[0] + 1) / 2
    return returnRange

maxSeatID=963
seatList=[0]*(maxSeatID+1)

for b in boardingPasses:
    colArray=[0,127]
    rowArray=[0,7]
    for l in b:
        if l=="F" or l=="B":
            colArray=rangeGivenFB(colArray,l)
        if l=="R" or l=="L":
            rowArray=rangeGivenLR(rowArray,l)
    seatID=colArray[0]*8+rowArray[0]
    seatList[int(seatID)]=1

for k in range(len(seatList)):
    if seatList[k]==0:
        print(k)



