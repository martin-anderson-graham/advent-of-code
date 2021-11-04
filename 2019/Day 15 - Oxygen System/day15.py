

class OpCodeProgram:
    memory = []
    inputsArray = []

    def __init__(self, program, iArray):
        self.memory = program.copy()
        self.outputs = []
        self.pointer = 0
        self.inputsArray = iArray.copy()
        self.inputPointer = 0
        self.relativeBase = 0
        self.shouldHalt = False

    def opCode(self):
        # runs a single opcode
        stringOpCode = str(self.memory[self.pointer])
        tempOpCode = int(stringOpCode[-2:])
        tempOpArray = []

        # to fill zeros beyond given memory
        while len(self.memory) < self.pointer + 4:
            self.memory.append(0)
        if tempOpCode == 1 or tempOpCode == 2 or tempOpCode == 7 or tempOpCode == 8:  # build tempOpArray based on opcode
            tempOpArray = self.memory[self.pointer:self.pointer + 4]
            self.pointer += 4
        elif tempOpCode == 99:
            self.shouldHalt = True
            return None
        elif tempOpCode == 3 or tempOpCode == 4 or tempOpCode == 9:
            tempOpArray = self.memory[self.pointer:self.pointer + 2]
            self.pointer += 2
        elif tempOpCode == 5 or tempOpCode == 6:
            tempOpArray = self.memory[self.pointer:self.pointer + 3]
        elif self.pointer > len(self.memory):  # when memory doesn't contain value
            raise SyntaxError("Invalid opcode at pointer")

        parameterModeArray = []
        parameterArray = []
        for k in range(len(stringOpCode[:-2])):  # build parameter array from opcode
            nextParameterMode = int(stringOpCode[:-2][len(stringOpCode[:-2]) - 1 - k])
            parameterModeArray.append(nextParameterMode)
        while len(parameterModeArray) < (len(tempOpArray) - 1):
            parameterModeArray.append(0)  # to make sure the arrays match fill mode array with zeros

        # addition opcode
        if tempOpCode == 1:
            for k in range(len(parameterModeArray) - 1):  # loop through parameterModeArray except last element
                try:
                    if parameterModeArray[k] == 0:
                        parameterArray.append(self.memory[tempOpArray[k + 1]])
                    elif parameterModeArray[k] == 1:
                        parameterArray.append(tempOpArray[k + 1])
                    elif parameterModeArray[k] == 2:
                        parameterArray.append(self.memory[tempOpArray[k + 1] + self.relativeBase])
                except:
                    parameterArray.append(0)  # if we are beyond memory
            if parameterModeArray[-1] == 2:
                parameterArray.append(tempOpArray[-1] + self.relativeBase)
            else:
                parameterArray.append(tempOpArray[-1])
            while parameterArray[2] >= len(self.memory):
                self.memory.append(0)

            self.memory[parameterArray[2]] = parameterArray[0] + parameterArray[1]

        #multiply opcode
        elif tempOpCode == 2:
            for k in range(len(parameterModeArray) - 1):  # loop through parameterModeArray except last element
                if parameterModeArray[k] == 0:
                    try:
                        parameterArray.append(self.memory[tempOpArray[k + 1]])
                    except:  # beyond memory
                        parameterArray.append(0)
                elif parameterModeArray[k] == 1:
                    parameterArray.append(tempOpArray[k + 1])
                elif parameterModeArray[k] == 2:
                    try:
                        parameterArray.append(self.memory[tempOpArray[k + 1] + self.relativeBase])
                    except:
                        parameterArray.append(0)
            if parameterModeArray[-1] == 2:
                parameterArray.append(tempOpArray[-1] + self.relativeBase)
            else:
                parameterArray.append(tempOpArray[-1])
            while parameterArray[2] >= len(self.memory):
                self.memory.append(0)
            self.memory[parameterArray[2]] = parameterArray[0] * parameterArray[1]

        # input opcode
        elif tempOpCode == 3:  # input opcode
            value = self.inputsArray[self.inputPointer]
            if parameterModeArray[0] == 2:
                parameterArray.append(tempOpArray[1] + self.relativeBase)
            else:
                parameterArray.append(tempOpArray[1])
            while parameterArray[0] >= len(self.memory):
                self.memory.append(0)
            self.memory[parameterArray[0]] = value
            #self.inputPointer += 1

        # output opcode
        elif tempOpCode == 4:  # output opcode
            try:
                if parameterModeArray[0] == 2:
                    value = self.memory[tempOpArray[1] + self.relativeBase]
                elif parameterModeArray[0] == 0:
                    value = self.memory[tempOpArray[1]]
                elif parameterModeArray[0] == 1:
                    value = tempOpArray[1]
            except:
                value = 0  # if output index is beyond memory
            self.outputs.append(value)

        # jump-if-true opcode
        elif tempOpCode == 5:  # jump-if-true opcode
            try:
                if parameterModeArray[0] == 2:
                    parameterArray.append(self.memory[tempOpArray[1] + self.relativeBase])
                elif parameterModeArray[0] == 1:
                    parameterArray.append(tempOpArray[1])
                elif parameterModeArray[0] == 0:
                    parameterArray.append(self.memory[tempOpArray[1]])
            except:
                parameterArray.append(0)  # if outside memory

            if parameterModeArray[1] == 2:
                parameterArray.append(self.memory[tempOpArray[2] + self.relativeBase])
            elif parameterModeArray[1] == 1:
                parameterArray.append(tempOpArray[2])
            elif parameterModeArray[1] == 0:
                parameterArray.append(self.memory[tempOpArray[2]])

            if parameterArray[0] != 0:
                self.pointer = parameterArray[1]
            else:
                self.pointer += 3

        # jump-if-false opcode
        elif tempOpCode == 6:  # jump-if-false opcode
            try:
                if parameterModeArray[0] == 2:
                    parameterArray.append(self.memory[tempOpArray[1] + self.relativeBase])
                elif parameterModeArray[0] == 1:
                    parameterArray.append(tempOpArray[1])
                elif parameterModeArray[0] == 0:
                    parameterArray.append(self.memory[tempOpArray[1]])
            except:
                parameterArray.append(0)  # if outside memory

            if parameterModeArray[1] == 2:
                parameterArray.append(self.memory[tempOpArray[2] + self.relativeBase])
            elif parameterModeArray[1] == 1:
                parameterArray.append(tempOpArray[2])
            elif parameterModeArray[1] == 0:
                parameterArray.append(self.memory[tempOpArray[2]])

            if parameterArray[0] == 0:
                self.pointer = parameterArray[1]
            else:
                self.pointer += 3

        # less-than opcode
        elif tempOpCode == 7:  # less than
            for k in range(len(parameterModeArray) - 1):  # loop through parameterModeArray except last element
                if parameterModeArray[k] == 0:
                    parameterArray.append(self.memory[tempOpArray[k + 1]])
                elif parameterModeArray[k] == 1:
                    parameterArray.append(tempOpArray[k + 1])
                elif parameterModeArray[k] == 2:
                    parameterArray.append(self.memory[tempOpArray[k + 1] + self.relativeBase])
            if parameterModeArray[-1] == 2:
                parameterArray.append(tempOpArray[-1] + self.relativeBase)
            else:
                parameterArray.append(tempOpArray[-1])

            while parameterArray[2] >= len(self.memory):
                self.memory.append(0)

            if parameterArray[0] < parameterArray[1]:
                self.memory[parameterArray[2]] = 1
            else:
                self.memory[parameterArray[2]] = 0

        # equals opcode
        elif tempOpCode == 8:  # equals
            for k in range(len(parameterModeArray) - 1):  # loop through parameterModeArray except last element
                if parameterModeArray[k] == 0:
                    parameterArray.append(self.memory[tempOpArray[k + 1]])
                elif parameterModeArray[k] == 1:
                    parameterArray.append(tempOpArray[k + 1])
                elif parameterModeArray[k] == 2:
                    parameterArray.append(self.memory[tempOpArray[k + 1] + self.relativeBase])
            if parameterModeArray[-1] == 2:
                parameterArray.append(tempOpArray[-1] + self.relativeBase)
            else:
                parameterArray.append(tempOpArray[-1])

            while parameterArray[2] >= len(self.memory):
                self.memory.append(0)

            if parameterArray[0] == parameterArray[1]:
                self.memory[parameterArray[2]] = 1
            else:
                self.memory[parameterArray[2]] = 0

        # relative base offset opcode
        elif tempOpCode == 9:
            try:  # in case parameter is out of range of memory
                if parameterModeArray[0] == 2:
                    self.relativeBase += self.memory[tempOpArray[1] + self.relativeBase]
                elif parameterModeArray[0] == 1:
                    self.relativeBase += tempOpArray[1]
                elif parameterModeArray[0] == 0:
                    self.relativeBase += self.memory[tempOpArray[1]]
            except:
                self.relativeBase += 0

        countdf=3

    def iterateUntilNextOutput(self):
        currentOutputLength = len(self.outputs)
        while len(self.outputs) == currentOutputLength and not self.shouldHalt:
            self.opCode()
        return None

    def iterateUntilHalt(self):
        while not self.shouldHalt and self.pointer < len(self.memory):
            self.opCode()

        return None


userInput = ""
puzzleInput = open("input.txt")
programStr = puzzleInput.readline().rstrip().split(',')
program = []
for k in programStr:
    program.append(int(k))
puzzleInput.close()

