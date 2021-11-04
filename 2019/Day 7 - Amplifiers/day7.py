def opCode(pointer,input,tempCompleteArray):  ##returns array of results [value, indexToPlaceValue, how far to advance pointer],[boolean shouldHalt], boolean shouldUpdate
    value=0
    indexToPlaceValue=0
    newPointer=pointer
    stringOpCode=str(tempCompleteArray[pointer])
    tempOpCode=int(stringOpCode[-2:])
    shouldHalt=False
    shouldUpdate=False
    shouldOutput=False
    usedInput=False

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
        usedInput=True

    elif tempOpCode==4: #output opcode
        if parameterModeArray[0]==0:
            parameter1=tempCompleteArray[tempOpArray[1]]
        else:
            parameter1=tempOpArray[1]
        shouldOutput=True
        value=parameter1

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

    return(value,indexToPlaceValue,newPointer,shouldHalt,shouldUpdate,shouldOutput,usedInput)

def opCodeProgram(t_pointer,input,iPointer,tempCompleteArray): #input is passed as array
    outputs=[]
    pointer=t_pointer
    inputPointer=iPointer
    currentInput=input[inputPointer]
    while pointer<len(tempCompleteArray):
        value,indexToPlaceValue,pointer,shouldHalt,shouldUpdate,shouldOutput,usedInput=opCode(pointer,currentInput,tempCompleteArray)
        if shouldUpdate:
            tempCompleteArray[indexToPlaceValue]=value
        if shouldHalt:
            #print("Halting")
            break
        if shouldOutput:
            outputs.append(value)
        if usedInput:
            inputPointer+=1
            if inputPointer<len(input): #catch when last input has been used but no output yet
                currentInput=input[inputPointer]
        if inputPointer==len(input) and len(outputs)!=0:
            break
    return outputs,shouldHalt, inputPointer, pointer,tempCompleteArray

def phaseSettingProgram(phaseSettings,tempCompleteArray): #takes array of phase settings and complete array,
    input=0
    memoryArray=[]
    pointerArray=[]
    inputArray=[]
    inputPointerArray=[]
    for k in range(5): #populate an array of memory
        memoryArray.append(tempCompleteArray.copy())
        pointerArray.append(0)
        inputPointerArray.append(0)
    for p in range(len(phaseSettings)):
        inputArray.append([phaseSettings[p]])
    inputArray[0]=[phaseSettings[0],input]
    shouldHalt=False
    currentAmp=0
    while not shouldHalt:
        tempOutputs,shouldHalt,inputPointer,pointer,tempCompleteArray=opCodeProgram(pointerArray[currentAmp],inputArray[currentAmp],inputPointerArray[currentAmp],memoryArray[currentAmp])
        pointerArray[currentAmp]=pointer
        inputPointerArray[currentAmp]=inputPointer
        memoryArray[currentAmp]=tempCompleteArray
        currentAmp+=1
        if currentAmp==len(memoryArray):
            currentAmp=0
        for k in tempOutputs:
            inputArray[currentAmp].append(k)
    return inputArray[0][len(inputArray[0])-1]






puzzleInputFile=open("C:/Users/agraham/Google Drive/Spare Time/Python/AdventOfCode/Day 7 - Amplifiers/input.txt")
line=puzzleInputFile.readline()
inputstr= line.split(',')
input=[]
for k in inputstr:
    input.append(int(k))
puzzleInputFile.close()

maxSignal=0
maxPhaseSettings=[]


possiblePhaseSettings=[5,6,7,8,9]
#possiblePhaseSettings=[0,1,2,3,4]
for a in possiblePhaseSettings:
    usedDigits=[a]
    for b in possiblePhaseSettings:
        if b not in usedDigits:
            usedDigits.append(b)
            for c in possiblePhaseSettings:
                if c not in usedDigits:
                    usedDigits.append(c)
                    for d in possiblePhaseSettings:
                        if d not in usedDigits:
                            usedDigits.append(d)
                            for e in possiblePhaseSettings:
                                if e not in usedDigits:
                                    phaseSettings=[a,b,c,d,e]
                                    try:
                                        result=phaseSettingProgram(phaseSettings,input)
                                        print(result)
                                        if result>maxSignal:
                                            maxSignal=result
                                            maxPhaseSettings=[a,b,c,d,e]
                                    except:
                                        continue
                                usedDigits=[a,b,c,d]
                        usedDigits=[a,b,c]
                usedDigits=[a,b]
        usedDigits=[a]



print("Max amplification is",maxSignal,"at phase setting",maxPhaseSettings)
