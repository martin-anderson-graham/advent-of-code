import string

alpha = string.ascii_lowercase

polymerFile = open("input.txt")
for line in polymerFile:
    polymer = line.rstrip()

polymerFile.close()

#polymer = "dabAcCaCBAcCcaDA"
#print(polymer)

def react(pstring, startingIndex):
    for i in range(startingIndex, len(pstring)-1):
        if pstring[i].lower() == pstring[i+1].lower():
            if (pstring[i].isupper() and pstring[i+1].islower()) or (pstring[i].islower() and pstring[i+1].isupper()):
                return True, (pstring[:i]+pstring[(i+2):]), i-1
    return False, pstring, i-1



minPolymerLength = len(polymer)

for a in alpha:
    tempPolymer = polymer.replace(a, '').replace(a.upper(), '')
    index = 0
    reacting = True
    while reacting:
        reacting, tempPolymer, index = react(tempPolymer, index)
        if index < 0:
            index = 0
    if len(tempPolymer) < minPolymerLength:
        minPolymerLength = len(tempPolymer)

print("Shorted polymer is",minPolymerLength)


