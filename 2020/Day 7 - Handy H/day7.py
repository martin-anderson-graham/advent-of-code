bagListFile = open("input.txt")
bagList = []
for f in bagListFile:
    bagList.append(f[:-2])
bagListFile.close()


bagRules = {}
for a in bagList:
    tempArray = a.split(" contain ")
    bagRules[tempArray[0][:-1]] = []
    tempAnte = tempArray[1].split(", ")
    for b in tempAnte:
        if "no other bag" in b:
            break
        if b.endswith("s"):
            bagRules[tempArray[0][:-1]].append([int(b[0]), b[2:-1]])
        else:
            bagRules[tempArray[0][:-1]].append([int(b[0]), b[2:]])


canHoldShinyGoldBag = []

for a in bagRules:
    for b in bagRules.get(a):
        if b[1] == "shiny gold bag":
            canHoldShinyGoldBag.append(a)


checking = True
while checking:
    checking = False
    for a in bagRules:
        for b in bagRules.get(a):
            if b[1] in canHoldShinyGoldBag and a not in canHoldShinyGoldBag:
                canHoldShinyGoldBag.append(a)
                checking = True

print("Number of bags that can hold shiny gold bag is", len(canHoldShinyGoldBag))

inShinyGoldBag = bagRules.get("shiny gold bag")

exteriorBagCount = 0
checking = True
while checking:
    checking = False
    tempArray = []
    for a in inShinyGoldBag:
        if len(bagRules.get(a[1])) == 0:
            tempArray.append(a)
        else:
            exteriorBagCount += a[0]
            for b in bagRules.get(a[1]):
                tempArray.append([a[0]*b[0], b[1]])
                checking = True
    inShinyGoldBag = tempArray.copy()


totalCount = exteriorBagCount
for a in inShinyGoldBag:
    totalCount += a[0]

print("Total count of bags in our shiny golden bag is", totalCount)
