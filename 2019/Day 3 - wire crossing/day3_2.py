import numpy as np


#parsing the file into a list of list of string instructions
#wirePathFile=open("C:/Users/agraham/Google Drive/Spare Time/Python/AdventOfCode/Day 3/input.txt")
wirePathFile=open("C:/Users/agraham/Google Drive/Spare Time/Python/AdventOfCode/Day 3/input.txt")
wirePathList=[]

def parseInstruction(instruction): #parses a single instruction ie 'R30'
    result=[0,0,0]  # [x,y,value]
    try:
        value=int(instruction[1:])
    except ValueError:
        return result
    if instruction[0]=='R':
        result=[1,0,value]
    elif instruction[0]=='L':
        result=[-1,0,value]
    elif instruction[0]=='U':
        result=[0,1,value]
    elif instruction[0]=='D':
        result=[0,-1,value]

    return result

def totalInstructionValue(instructionList): #to find the total size of numpy array needed
    result=0
    for k in instructionList:
        result+=parseInstruction(k)[2]
    return result

def createWire(instructionList): #returns a numpy array give an instruction list
    result=np.zeros(shape=(totalInstructionValue(instructionList),2))
    x=0
    y=0
    step=0
    for index in range(len(instructionList)):
        instructionResult=parseInstruction(instructionList[index])
        for v in range(instructionResult[2]):
            x+=instructionResult[0]
            y+=instructionResult[1]
            result[step]=[x,y]
            step+=1
    #print(result)
    return result

def findWireIntersectionsMinManhattan(wire1,wire2): #takes two numpy wire arrays and find the intersection with minimum manhattanvalue
    result=[1000,1000,0]  #returns [x,y,steps]
    for a in wire1:
        if any(np.equal(a,wire2).all(1)):
            if a[0]+a[1] < result[0]+result[1]:
                result=[a[0],a[1],abs(a[0])+abs(a[1])]
    return result

def get_index(seq, *arrays):
    for array in arrays:
        try:
            return np.where(array==seq)[0][0]
        except IndexError:
            pass

def findWireIntersectionsMinSteps(wire1,wire2): #takes two numpy wire arrays and find the intersection with minimum value
    result=[1000,1000,10000000]  #returns [x,y,steps]
    for a in wire1:
        if any(np.equal(a,wire2).all(1)):
            value=get_index(a.tolist(),wire2)+get_index(a.tolist(),wire1)
            print("found candidate", value+2)
            if value+2<result[2]:
                result=[a[0],a[1],value+2]
    return result

while True:
    k=wirePathFile.readline()
    if len(k)==0:
        break
    tempList=[]
    while True:
        index=k.find(',')
        if index==-1:
            tempList.append(k[:-1])  #adds the last item before quitting
            break
        tempList.append(k[0:index])
        k=k[index+1::]
    wirePathList.append(tempList)
wirePathFile.close()
print("file parsed")


wire1=createWire(wirePathList[0])
wire2=createWire(wirePathList[1])
print("wires created")

print(findWireIntersectionsMinSteps(wire1,wire2))
