def opCode(pointer, input, tempCompleteArray, rBase):
    # runs a single opcode

    value = 0
    indexToPlaceValue = 0
    newPointer = pointer
    stringOpCode = str(tempCompleteArray[pointer])
    tempOpCode = int(stringOpCode[-2:])
    shouldHalt = False
    shouldUpdate = False
    shouldOutput = False
    usedInput = False
    tempOpArray = []
    relativeBase = rBase

    # to fill zeros beyond given memory
    while len(tempCompleteArray) < pointer + 4:
        tempCompleteArray.append(0)
    if tempOpCode == 1 or tempOpCode == 2 or tempOpCode == 7 or tempOpCode == 8:  # build tempOpArray based on opcode
        tempOpArray = tempCompleteArray[pointer:pointer + 4]
        newPointer = pointer + 4
    elif tempOpCode == 99:
        tempOpArray = [0, 0]
        shouldHalt = True
    elif tempOpCode == 3 or tempOpCode == 4 or tempOpCode == 9:
        tempOpArray = tempCompleteArray[pointer:pointer + 2]
        newPointer = pointer + 2
    elif tempOpCode == 5 or tempOpCode == 6:
        tempOpArray = tempCompleteArray[pointer:pointer + 3]
    elif pointer > len(tempCompleteArray):  # when memory doesn't contain value
        raise SyntaxError("Invalid opcode at pointer")

    parameterModeArray = []
    parameterArray = []
    for k in range(len(stringOpCode[:-2])):  # build parameter array from opcode
        nextParameterMode = int(stringOpCode[:-2][len(stringOpCode[:-2]) - 1 - k])
        parameterModeArray.append(nextParameterMode)
    while len(parameterModeArray) < (len(tempOpArray) - 1):
        parameterModeArray.append(0)  # to make sure the arrays match fill mode array with zeros
    #
    # for i in range(len(tempOpArray) - 1):
    #     try:  # for cases where the Opcode doesn't include parameter information
    #         if parameterModeArray[i] == 0:
    #             parameterArray.append(tempCompleteArray[tempOpArray[i + 1]])
    #         elif parameterModeArray[i] == 1:
    #             parameterArray.append(tempOpArray[i + 1])
    #         elif parameterModeArray[i] == 2:
    #             parameterArray.append(tempOpArray[i + 1] + relativeBase)
    #     except:
    #         try:  # when we need to reference beyond end of memory
    #             parameterArray.append(
    #                 tempCompleteArray[tempOpArray[i + 1]])  # assume positional and works if memory is long enough
    #         except:
    #             parameterArray.append(0)  # if memory isn't long enough then reference will be zero
    # # the last parameter is the write location, so is either positional or relative address, so undo last item set above
    #     # for only certain opcodes!
    # if tempOpCode != 9 and tempOpCode != 3:
    #     if parameterModeArray[-1] == 0:
    #         parameterArray[-1] = tempOpArray[-1]
    #     elif parameterModeArray[-1] == 2:
    #         parameterArray[-1] = tempCompleteArray[tempOpArray[-1] ]+ relativeBase

    if tempOpCode == 1:  # add opcode
        for k in range(len(parameterModeArray)-1):  #loop through parameterModeArray except last element
            try:
                if parameterModeArray[k] == 0:
                    parameterArray.append(tempCompleteArray[tempOpArray[k+1]])
                elif parameterModeArray[k] == 1:
                    parameterArray.append(tempOpArray[k+1])
                elif parameterModeArray[k] == 2:
                    parameterArray.append(tempCompleteArray[tempOpArray[k+1]+relativeBase])
            except:
                parameterArray.append(0) #if we are beyond memory
        if parameterModeArray[-1] == 2:
            parameterArray.append(tempOpArray[-1]+relativeBase)
        else:
            parameterArray.append(tempOpArray[-1])
        value = parameterArray[0] + parameterArray[1]
        indexToPlaceValue = parameterArray[2]
        shouldUpdate = True  # addition opcode

    elif tempOpCode == 2:  # multiply opcode
        for k in range(len(parameterModeArray) - 1):  # loop through parameterModeArray except last element
            if parameterModeArray[k] == 0:
                parameterArray.append(tempCompleteArray[tempOpArray[k + 1]])
            elif parameterModeArray[k] == 1:
                parameterArray.append(tempOpArray[k + 1])
            elif parameterModeArray[k] == 2:
                parameterArray.append(tempCompleteArray[tempOpArray[k + 1] + relativeBase])
        if parameterModeArray[-1] == 2:
            parameterArray.append(tempOpArray[-1] + relativeBase)
        else:
            parameterArray.append(tempOpArray[-1])
        value = parameterArray[0] * parameterArray[1]
        indexToPlaceValue = parameterArray[2]
        shouldUpdate = True  # multiplication opcode

    elif tempOpCode == 3:  # input opcode
        value = input
        if parameterModeArray[0] == 2:
            indexToPlaceValue = tempOpArray[1]+relativeBase
        else:
            indexToPlaceValue = tempOpArray[1]
        shouldUpdate = True
        usedInput = True

    elif tempOpCode == 4:  # output opcode
        shouldOutput = True
        try:
            if parameterModeArray[0] == 2:
                value = tempCompleteArray[tempOpArray[1]+relativeBase]
            elif parameterModeArray[0] == 0:
                value = tempCompleteArray[tempOpArray[1]]
        except:
            value = 0  # if output index is beyond memory

    elif tempOpCode == 5:  # jump-if-true opcode
        try:
            if parameterModeArray[0] == 2:
                parameterArray.append(tempCompleteArray[tempOpArray[1] + relativeBase])
            elif parameterModeArray[0] == 1:
                parameterArray.append(tempOpArray[1])
            elif parameterModeArray[0] == 0:
                parameterArray.append(tempCompleteArray[tempOpArray[1]])
        except:
            parameterArray.append(0) #if outside memory

        if parameterModeArray[1] == 2:
            parameterArray.append(tempCompleteArray[tempOpArray[2] + relativeBase])
        elif parameterModeArray[1] == 1:
            parameterArray.append(tempOpArray[2])
        elif parameterModeArray[1] == 0:
            parameterArray.append(tempCompleteArray[tempOpArray[2]])

        if parameterArray[0] != 0:
            newPointer = parameterArray[1]
        else:
            newPointer += 3

    elif tempOpCode == 6:  # jump-if-false opcode
        try:
            if parameterModeArray[0] == 2:
                parameterArray.append(tempCompleteArray[tempOpArray[1] + relativeBase])
            elif parameterModeArray[0] == 1:
                parameterArray.append(tempOpArray[1])
            elif parameterModeArray[0] == 0:
                parameterArray.append(tempCompleteArray[tempOpArray[1]])
        except:
            parameterArray.append(0) #if outside memory

        if parameterModeArray[1] == 2:
            parameterArray.append(tempCompleteArray[tempOpArray[2] + relativeBase])
        elif parameterModeArray[1] == 1:
            parameterArray.append(tempOpArray[2])
        elif parameterModeArray[1] == 0:
            parameterArray.append(tempCompleteArray[tempOpArray[2]])

        if parameterArray[0] == 0:
            newPointer = parameterArray[1]
        else:
            newPointer += 3

    elif tempOpCode == 7:  # less than
        for k in range(len(parameterModeArray) - 1):  # loop through parameterModeArray except last element
            if parameterModeArray[k] == 0:
                parameterArray.append(tempCompleteArray[tempOpArray[k + 1]])
            elif parameterModeArray[k] == 1:
                parameterArray.append(tempOpArray[k + 1])
            elif parameterModeArray[k] == 2:
                parameterArray.append(tempCompleteArray[tempOpArray[k + 1] + relativeBase])
        if parameterModeArray[-1] == 2:
            parameterArray.append(tempOpArray[-1] + relativeBase)
        else:
            parameterArray.append(tempOpArray[-1])

        if parameterArray[0] < parameterArray[1]:
            value = 1
        else:
            value = 0

        indexToPlaceValue = parameterArray[2]
        shouldUpdate = True

    elif tempOpCode == 8:  # equals
        for k in range(len(parameterModeArray) - 1):  # loop through parameterModeArray except last element
            if parameterModeArray[k] == 0:
                parameterArray.append(tempCompleteArray[tempOpArray[k + 1]])
            elif parameterModeArray[k] == 1:
                parameterArray.append(tempOpArray[k + 1])
            elif parameterModeArray[k] == 2:
                parameterArray.append(tempCompleteArray[tempOpArray[k + 1] + relativeBase])
        if parameterModeArray[-1] == 2:
            parameterArray.append(tempOpArray[-1] + relativeBase)
        else:
            parameterArray.append(tempOpArray[-1])

        if parameterArray[0] == parameterArray[1]:
            value = 1
        else:
            value = 0

        indexToPlaceValue = parameterArray[2]
        shouldUpdate = True

    elif tempOpCode == 9:  # relative base offset opcode
        try: # in case parameter is out of range of memory
            if parameterModeArray[0] ==2:
                relativeBase += tempCompleteArray[tempOpArray[1]+relativeBase]
            elif parameterModeArray[0] == 1:
                relativeBase += tempOpArray[1]
            elif parameterModeArray[0] == 0:
                relativeBase += tempCompleteArray[tempOpArray[1]]
        except:
            relativeBase +=0
    return (value, indexToPlaceValue, newPointer, shouldHalt, shouldUpdate, shouldOutput, usedInput, relativeBase)


def opCodeProgram(t_pointer, input, iPointer, tempCompleteArray):  # input is passed as array
    outputs = []
    pointer = t_pointer
    inputPointer = iPointer
    currentInput = input[inputPointer]
    relativeBase = 0
    while pointer < len(tempCompleteArray):
        value, indexToPlaceValue, pointer, shouldHalt, shouldUpdate, shouldOutput, usedInput, relativeBase = opCode(
            pointer, currentInput, tempCompleteArray, relativeBase)
        if shouldUpdate:
            while indexToPlaceValue >= len(tempCompleteArray):
                tempCompleteArray.append(0)
            tempCompleteArray[indexToPlaceValue] = value
        if shouldHalt:
            # print("Halting")
            break
        if shouldOutput:
            outputs.append(value)
        if usedInput:
            inputPointer += 1
            if inputPointer < len(input):  # catch when last input has been used but no output yet
                currentInput = input[inputPointer]

    return outputs, shouldHalt, inputPointer, pointer, tempCompleteArray


puzzleInputFile = open(
    "C:/Users/agraham/Google Drive/Spare Time/Python/AdventOfCode/Day 9 - Sensor Boost Intcode III/input.txt")
line = puzzleInputFile.readline().rstrip()
inputstr = line.split(',')
input = []
for k in inputstr:
    input.append(int(k))
puzzleInputFile.close()

#input=[109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]  # outputs this array
# input=[1102,34915192,34915192,7,4,7,99,0]
# input=[104,1125899906842624,99]
#input= [109, -1, 4, 1, 99] #-1
#input =[109, 1, 9, 2, 204, -6, 99] #204
#input=[109, -1, 104, 1, 99] #1
#input=[109, 1, 109, 9, 204, -6, 99] # 204
#input = [109, 1, 209, -1, 204, -106, 99] # 204
#input = [109, 1, 3, 3, 204, 2, 99] #outputs the input
#input = [109, 1, 203, 2, 204, 2, 99] #outputs the input
#input = [1102,6,1,0,4,0,99]

print(opCodeProgram(0, [2], 0, input)[0])  # prints output array
