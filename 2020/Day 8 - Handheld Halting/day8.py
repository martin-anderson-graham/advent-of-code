programFile = open("input.txt")
program = []
for line in programFile:
    program.append(line.rstrip())
programFile.close()


def bootInterpreter(programarray):  #takes a program and only returns valid results
    index = 0
    usedInstructions = [False]*len(programarray)  #check for loops by seeing used instructions
    accumulator = 0
    validProgram = True
    while validProgram:
        usedInstructions[index] = True
        instruction = programarray[index].split(" ")
        if instruction[0] == "nop":
            index += 1
        elif instruction[0] == "acc":
            accumulator += int(instruction[1])
            index += 1
        elif instruction[0] == "jmp":
            index += int(instruction[1])

        if index == len(programarray):
            return [True, accumulator]

        elif index > len(programarray):
            return [False, accumulator]

        elif usedInstructions[index]:
            return [False, accumulator]


valid = False
acc = 0

for i in range(len(program)):
    tempProgram = program.copy()
    line = tempProgram[i].split(" ")

    if line[0] == "nop":
        tempProgram[i] = "jmp "+line[1]
        valid, acc = bootInterpreter(tempProgram)

    elif line[0] == "jmp":
        tempProgram[i] = "nop "+line[1]
        valid, acc = bootInterpreter(tempProgram)
    if valid:
        break

print("Valid accumulator is", acc)
