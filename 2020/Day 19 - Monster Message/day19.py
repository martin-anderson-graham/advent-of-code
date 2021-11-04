import string

rulesFile = open("input.txt")
rules = {}
messages = []
fileRules = True
index = 0
for line in rulesFile:

    if line == '\n':
        fileRules = False
        continue
    if fileRules:
        ruleNumber = int(line[:line.find(':')])
        if "\"" in line:
            rules[ruleNumber] = line.rstrip()[-2:-1]
        elif "|" in line:
            optionOne = line.rstrip()[line.find(':') + 1:].split(" | ")[0].split(" ")[1:3]
            optionTwo = line.rstrip()[line.find(':') + 1:].split("|")[1].split(" ")[1:]
            rules[ruleNumber] = [[], []]
            for a in optionOne:
                rules[ruleNumber][0].append(int(a))
            for b in optionTwo:
                rules[ruleNumber][1].append(int(b))
        else:
            tempArray = line.rstrip()[line.find(":") + 2:].split(" ")
            rules[ruleNumber] = [[]]
            for a in tempArray:
                rules[ruleNumber][0].append(int(a))

    else:
        messages.append(line.rstrip())

#print(rules)
# print(messages)
rulesFile.close()


def meetsRule(ruleIndex, message):
    return True


def buildValidMessages(ruleIndex):
    # print(ruleIndex)
    validMessages = [""]
    # single letter rules
    if type(rules[ruleIndex]) == type(""):
        return [rules[ruleIndex]]

    ## or rules
    elif len(rules[ruleIndex]) == 2:
        validMessages = []
        for ruleSet in rules[ruleIndex]:
            tempValidMessages = [""]
            for r in ruleSet:
                tempMessages = []
                tempResult = buildValidMessages(r)
                for a in tempResult:
                    for b in tempValidMessages:
                        tempMessages.append(b + a)
                tempValidMessages = tempMessages.copy()
            for t in tempValidMessages:
                validMessages.append(t)
        return validMessages

    elif len(rules[ruleIndex]) == 1:

        for r in rules[ruleIndex][0]:
            tempResult = buildValidMessages(r)
            tempValidMessages = []
            for a in tempResult:
                for b in validMessages:
                    tempValidMessages.append(b + a)
            validMessages = tempValidMessages.copy()
        return validMessages
    return None


#matchingMessages = {}
#matchingMessages[0] = buildValidMessages(0)

#matchCount = {}
#matchCount[0] = 0

#for m in messages:
#    if m in matchingMessages[0]:
#        matchCount[0] += 1

#print("Number of matches to rule zero is", matchCount[0])

#replace
# 8: 42 | 42 8
#11: 42 31 | 42 11 31
