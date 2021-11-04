def opCode(pointer,input,tempCompleteArray):  ##returns array of results [value, indexToPlaceValue, how far to advance pointer],[boolean shouldHalt], boolean shouldUpdate
    value=0
    indexToPlaceValue=0
    newPointer=pointer
    stringOpCode=str(tempCompleteArray[pointer])
    tempOpCode=int(stringOpCode[-2:])
    shouldHalt=False
    shouldUpdate=False

    if tempOpCode==1 or tempOpCode==2 or tempOpCode==7 or tempOpCode==8:  #build tempOpArray based on opcode
        tempOpArray=tempCompleteArray[pointer:pointer+4]
        newPointer=pointer+4
    elif tempOpCode==99:
        shouldHalt=True
    elif tempOpCode==3 or tempOpCode==4:
        tempOpArray=tempCompleteArray[pointer:pointer+2]
        newPointer=pointer+2
    elif tempOpCode==5 or tempOpCode==6:
        tempOpArray=tempCompleteArray[pointer:pointer+3]
    else:
        raise SyntaxError("Invalid opcode at pointer")

    parameterModeArray=[0,0,0]
    for k in range(len(stringOpCode[:-2])):  #build parameter array from opcode
        nextParamter=int(stringOpCode[:-2][len(stringOpCode[:-2])-1-k])
        parameterModeArray[k]=nextParamter

    if tempOpCode==1:  #add opcode
        if(parameterModeArray[0]==0):
            parameter1=tempCompleteArray[tempOpArray[1]]
        else:
            parameter1=tempOpArray[1]
        if(parameterModeArray[1]==0):
            parameter2=tempCompleteArray[tempOpArray[2]]
        else:
            parameter2=tempOpArray[2]

        value=parameter1+parameter2
        indexToPlaceValue=tempOpArray[3]
        shouldUpdate=True  #addition opcode

    elif tempOpCode==2: #multiply opcode
        if(parameterModeArray[0]==0):
            parameter1=tempCompleteArray[tempOpArray[1]]
        else:
            parameter1=tempOpArray[1]
        if(parameterModeArray[1]==0):
            parameter2=tempCompleteArray[tempOpArray[2]]
        else:
            parameter2=tempOpArray[2]

        value=parameter1*parameter2
        indexToPlaceValue=tempOpArray[3]
        shouldUpdate=True #multiplcation opcode

    elif tempOpCode==3:  #input opcode
        value=input
        indexToPlaceValue=tempOpArray[1]
        shouldUpdate=True

    elif tempOpCode==4: #output opcode
        if parameterModeArray[0]==0:
            parameter1=tempCompleteArray[tempOpArray[1]]
        else:
            parameter1=tempOpArray[1]
        print("output:",parameter1)

    elif tempOpCode==5:  #jump-if-true opcode
        if parameterModeArray[0]==0:
            parameter1=tempCompleteArray[tempOpArray[1]]
        else:
            parameter1=tempOpArray[1]
        if parameterModeArray[1]==0:
            parameter2=tempCompleteArray[tempOpArray[2]]
        else:
            parameter2=tempOpArray[2]

        if parameter1!=0:
            newPointer=parameter2
        else:
            newPointer+=3

    elif tempOpCode==6: #jump-if-false opcode
        if parameterModeArray[0]==0:
            parameter1=tempCompleteArray[tempOpArray[1]]
        else:
            parameter1=tempOpArray[1]
        if parameterModeArray[1]==0:
            parameter2=tempCompleteArray[tempOpArray[2]]
        else:
            parameter2=tempOpArray[2]

        if parameter1==0:
            newPointer=parameter2
        else:
            newPointer+=3

    elif tempOpCode==7: #less than
        if parameterModeArray[0]==0:
            parameter1=tempCompleteArray[tempOpArray[1]]
        else:
            parameter1=tempOpArray[1]
        if parameterModeArray[1]==0:
            parameter2=tempCompleteArray[tempOpArray[2]]
        else:
            parameter2=tempOpArray[2]

        if parameter1<parameter2:
            value=1
        else:
            value=0

        indexToPlaceValue=tempOpArray[3]
        shouldUpdate=True

    elif tempOpCode==8: #equals
        if parameterModeArray[0]==0:
            parameter1=tempCompleteArray[tempOpArray[1]]
        else:
            parameter1=tempOpArray[1]
        if parameterModeArray[1]==0:
            parameter2=tempCompleteArray[tempOpArray[2]]
        else:
            parameter2=tempOpArray[2]

        if parameter1==parameter2:
            value=1
        else:
            value=0
        indexToPlaceValue=tempOpArray[3]
        shouldUpdate=True

    return(value,indexToPlaceValue,newPointer,shouldHalt,shouldUpdate)


inputfile=open("C:/Users/agraham/Google Drive/Spare Time/Python/AdventOfCode/Day 5/input.txt")
line=inputfile.readline()
inputstr= line.split(',')
input=[]
for k in inputstr:
    input.append(int(k))
inputfile.close()

userInput=5 #specified by prompt

#input=[3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]

pointer=0
while pointer<len(input):
    value,indexToPlaceValue,pointer,shouldHalt,shouldUpdate=opCode(pointer,userInput,input)
    if shouldUpdate:
        input[indexToPlaceValue]=value
    if shouldHalt:
        print("Halting")
        break
