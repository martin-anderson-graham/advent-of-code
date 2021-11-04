from operator import add

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
                try:
                    parameterArray.append(tempCompleteArray[tempOpArray[k + 1]])
                except: # beyond memory
                    parameterArray.append(0)
            elif parameterModeArray[k] == 1:
                parameterArray.append(tempOpArray[k + 1])
            elif parameterModeArray[k] == 2:
                try:
                    parameterArray.append(tempCompleteArray[tempOpArray[k + 1] + relativeBase])
                except:
                    parameterArray.append(0)
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


def opCodeProgram(t_pointer, input, iPointer, rbase, tempCompleteArray):  # input is passed as array
    output = 0
    pointer = t_pointer
    inputPointer = iPointer
    currentInput = input[inputPointer]
    relativeBase = rbase
    while pointer < len(tempCompleteArray):
        value, indexToPlaceValue, pointer, shouldHalt, shouldUpdate, shouldOutput, usedInput, relativeBase = opCode(
            pointer, currentInput, tempCompleteArray, relativeBase)
        if shouldUpdate:
            while indexToPlaceValue >= len(tempCompleteArray):
                tempCompleteArray.append(0)
            tempCompleteArray[indexToPlaceValue] = value
        if shouldHalt:
            break
        if usedInput:
            inputPointer += 1
            if inputPointer < len(input):  # catch when last input has been used but no output yet
                currentInput = input[inputPointer]
        if shouldOutput:
            output = value  #program now outputs each output individually
            break

    return output, shouldHalt, inputPointer, pointer, relativeBase, tempCompleteArray

def robotProgram(memory):
    pointer = 0
    paintedSquares = []
    robLocation = [0, 0]
    direction = 0  #0 corresponds to up
    moveArray = [[0, 1], [1, 0], [0, -1], [-1, 0]]
    nextInput = [0]
    shouldHalt = False
    whiteSquares = []
    outputs = []
    rbase = 0

    while True:
        while len(outputs) < 2:
            output, shouldHalt, inputPointer, pointer, rbase, memory = opCodeProgram(pointer, nextInput, 0, rbase, memory)
            outputs.append(output)
        if shouldHalt:
            break
        if outputs[0] == 1:  # paint squares from first output element
            if robLocation not in whiteSquares:
                whiteSquares.append(robLocation)
        elif outputs[0] == 0:
            if robLocation in whiteSquares:
                whiteSquares.pop(whiteSquares.index(robLocation))

        if outputs[1] == 0: # turn robot using second output element
            direction += -1
            if direction == -1:
                direction = 3
        elif outputs[1] == 1:
            direction += 1
            if direction == 4:
                direction = 0

        robLocation = list(map(add, robLocation, moveArray[direction]))

        if robLocation in whiteSquares:
            nextInput = [1]
        else:
            nextInput = [0]

        if robLocation not in paintedSquares:
            paintedSquares.append(robLocation)
        outputs = []




    return len(paintedSquares)-1  # last square doesn't get painted


useInput = ""
puzzleInputFile = open(
    "C:/Users/agraham/Google Drive/Spare Time/Python/AdventOfCode/Day 11 - Space Police - intcode/input"+useInput+".txt")
line = puzzleInputFile.readline().rstrip()
inputstr = line.split(',')
input = []
for k in inputstr:
    input.append(int(k))
puzzleInputFile.close()

print("Number of painted squares is", robotProgram(input))