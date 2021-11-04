operationFile = open("input.txt")
operations = []
for line in operationFile:
    operations.append(line.rstrip().split(" = "))
operationFile.close()

print(operations)


def recurse(ar):
    resultArray = []
    if len(ar) == 1:
        return [None], [ar[0]]
    else:
        for a in [None, ar[0]]:
            tempArray = [a]
            for b in recurse(ar[1:]):
                resultArray.append(tempArray + b)
    return resultArray


class Computer:
    def __init__(self):
        self.memory = {}
        self.mask = ""

    def processInstructionFirst(self, instruction_array):  # instruction array presented as an array of two strings
        if instruction_array[0] == "mask":
            self.mask = instruction_array[1]
        elif instruction_array[0][0:4] == "mem[":
            location = int(instruction_array[0][:-1].replace("mem[", ""))
            valueString = ""
            for d in bin(int(instruction_array[1]))[2:]:
                valueString += d
            while len(valueString) < len(self.mask):
                valueString = "0" + valueString
            resultString = ""
            for i in range(len(self.mask)):
                if self.mask[i] == "X":
                    resultString += valueString[i]
                else:
                    resultString += self.mask[i]
            self.memory[location] = int(resultString, 2)
        return None

    def processInstruction(self, instruction_array):  # instruction array presented as an array of two strings
        if instruction_array[0] == "mask":
            self.mask = instruction_array[1]
        elif instruction_array[0][0:4] == "mem[":
            location = int(instruction_array[0][:-1].replace("mem[", ""))
            locationString = ""
            for d in bin(location)[2:]:
                locationString += d
            while len(locationString) < len(self.mask):
                locationString = "0" + locationString
            preFloatString = ""
            floatingDigitIndexArray = []  # stored as the power of two that can float
            for i in range(len(self.mask)):
                if self.mask[i] == "X":
                    preFloatString += "X"
                    floatingDigitIndexArray.append(35 - i)
                elif self.mask[i] == "1":
                    preFloatString += "1"
                elif self.mask[i] == "0":
                    preFloatString += (locationString[i])
            # process preFloatString into all possible memory values array
            memoryLocationsToUpdate = []
            baseMemoryValue = 0
            for j in range(len(preFloatString)):
                if preFloatString[j] == "1":
                    baseMemoryValue += 2 ** (35 - j)
            memoryLocationAdjustmentList = recurse(floatingDigitIndexArray)
            for ml in memoryLocationAdjustmentList:
                tempBaseMemoryValue = baseMemoryValue
                for d in ml:
                    if d != None:
                        tempBaseMemoryValue += 2 ** d
                memoryLocationsToUpdate.append(tempBaseMemoryValue)
            for k in memoryLocationsToUpdate:
                self.memory[k] = int(instruction_array[1])
        return None

    def sumMemory(self):
        sum = 0
        for k in self.memory:
            sum += self.memory.get(k)
        return sum


computer1 = Computer()
for a in operations:
    computer1.processInstructionFirst(a)

print("Sum of memory for first star is", computer1.sumMemory())

computer2 = Computer()
for a in operations:
    computer2.processInstruction(a)
print("Sum of memory for second star is", computer2.sumMemory())
