import os

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

class PaddleGame:

    def __init__(self, program):
        self.joystickPosition = 0
        self.memory = OpCodeProgram(program, [0])
        self.board = []
        self.outputPointer = 0
        self.score = 0
        self.boardX = 0
        self.boardY = 0
        self.symbols = ['.','|','%','=','o']
        self.lastLoc = []
        self.paddleLoc = 0
        self.ballLoc = 0

        # self.seed = [0] * 10000
        # self.seed[1:2] = [1]
        # self.seed[50:51] = [-1]*2
        # self.seed[85:87] = [1] * 2
        # self.seed[280:287] = [-1] * 8
        # self.seed[340:350] = [1] * 8
        # self.seed[570:590] = [-1] * 14
        # self.seed[700:710] = [1] * 6
        # self.seed[1120:1130] = [-1] * 2
        # self.seed[1145:1155] = [-1] * 5
        # self.seed[1220:1230] = [1] * 2
        # self.seed[1350:1400] = [1] * 19
        # self.seed[1480:1500] = [-1] * 9
        # self.seed[1500:1520] = [1]*8
        # self.seed[1537:1550] = [1]*9
        # self.seed[1568:1600] = [-1] * 29
        # self.seed[1600:1650] = [1] * 30
        # self.seed[1644] = 1
        # self.seed[1645:1660] = [-1] * 10
        # self.seed[1660:1670] = [1] * 10
        # self.seed[1695:1696] = [-1] *2
        # self.seed[1710:1712] = [-1] *2
        # self.seed[1749:1753] = [-1] * 1
        # self.seed[1752] = -1
        # self.seed[1758] = -1
        # self.seed[1759:1761] = [1] *3
        # self.seed[1765:1800] = [-1] * 29
        # self.seed[1810] = -1
        # self.seed[1860:1900] = [1] * 22
        # self.seed[2200] = 1
        # self.seed[2220:2230] = [-1] * 8
        # self.seed[2260] = -1
        # self.seed[2390:2400] = [-1] *2
        # self.seed[2600] = -1
        # self.seed[2660] = -1
        # self.seed[2700:2720] = [1] * 14
        # self.seed[2800:2820] = [1] * 7
        # self.seed[2830:2880] = [-1] * 30
        # self.seed[2870:2900] = [1] * 28
        # self.seed[2920] = 1
        # self.seed[2970] = -1
        # self.seed[2980:3100] = [-1] * 28
        # self.seed[3015:3050] = [1] * 30
        # self.seed[3060:4000] = [-1] * 24
        # self.seed[3090] = -1
        # self.seed[3100:3200] = [1] * 17
        # self.seed[3150:3170] = [-1] * 8
        # self.seed[3220:3230] = [1] * 8
        # self.seed[3250:3280] = [-1] * 16
        # self.seed[3290:3320] = [1] * 24
        # self.seed[3330:3360] = [-1] * 30
        # self.seed[3365:3400] = [1] * 30

        #self.memory.inputsArray = self.seed


    def boardSetup(self):
        for k in range(37*23-1):
            outputTriple = []
            while len(outputTriple) < 3:
                self.memory.iterateUntilNextOutput()
                if self.memory.shouldHalt:
                    break
                outputTriple.append(self.memory.outputs[self.outputPointer])
                self.outputPointer += 1

            if self.memory.shouldHalt:
                break
            x = outputTriple[0]
            if x > self.boardX:
                self.boardX = x
            y = outputTriple[1]
            if y > self.boardY:
                self.boardY = y
            # expand the board to the x,y coordinates
            if x != -1:
                while len(self.board) <= x:
                    self.board.append([])
                while len(self.board[x]) <= y:
                    self.board[x].append(" ")
                if outputTriple[2] == 3:
                    self.paddleLoc = x
                elif outputTriple[2] == 4:
                    self.ballLoc = x
                self.board[x][y] = self.symbols[outputTriple[2]]
        #self.printBoard()

    def runGame(self):
        self.boardSetup()
        while True:
            self.memory.inputPointer = 0
            if self.ballLoc < self.paddleLoc:
                self.memory.inputsArray = [-1]
            elif self.ballLoc > self.paddleLoc:
                self.memory.inputsArray = [1]
            elif self.ballLoc == self.paddleLoc:
                self.memory.inputsArray = [0]


            outputTriple = []
            while len(outputTriple) < 3:
                self.memory.iterateUntilNextOutput()
                if self.memory.shouldHalt:
                    break
                outputTriple.append(self.memory.outputs[self.outputPointer])
                self.outputPointer += 1

            if self.memory.shouldHalt:
                break
            x = outputTriple[0]
            y = outputTriple[1]

            if x != -1:
                if outputTriple[2] == 3:
                    self.paddleLoc = x
                elif outputTriple[2] == 4:
                    self.ballLoc = x
                try:
                    self.board[x][y] = self.symbols[outputTriple[2]]
                except:
                    pass
                    #print("why fail?",outputTriple)

            elif x == -1:
                self.score = outputTriple[2]
            #self.printBoard()
            #os.system('cls')


    def printBoard(self):
        for a in range(len(self.board)):
          for b in range(len(self.board[a]), self.boardY+1):
              self.board[a].append(" ")

        for y in range(len(self.board[0])):
            line = ""
            for x in range(len(self.board)):
                line += self.board[x][y]
            print(line)
        print("Inputpointer:",self.memory.inputPointer)

    def countSympol(self, symbolChar):
        result = 0
        for a in self.board:
            for b in a:
                if b == symbolChar:
                    result += 1
        return result




userInput = ""
puzzleInput = open("C:/Users/agraham/Google Drive/Spare Time/Python/AdventOfCode/Day 13 - Care Package/input"+userInput+".txt")
programStr = puzzleInput.readline().rstrip().split(',')
program = []
for k in programStr:
    program.append(int(k))
puzzleInput.close()

game = PaddleGame(program)
game.runGame()
os.system("cls")
game.printBoard()
print("SeedCounter",game.memory.inputPointer)

print("Score is",game.score)

