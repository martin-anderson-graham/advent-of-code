allergenFile = open("input.txt")
foodList = {}

allergens = {}
foods = []
for line in allergenFile:

    elements = line.rstrip("/\n").split(" ")
    tempIndex = elements.index("(contains")
    foods.append(elements[0:tempIndex])
    tempAllergens = elements[tempIndex + 1::]
    for a in tempAllergens:
        a = a.rstrip(")").rstrip(",")
        if a not in allergens.keys():
            allergens[a] = [elements[0:tempIndex]]
        else:
            allergens[a].append(elements[0:tempIndex])

allergenFile.close()


def findAllergenIngredient(allergenList):
    result = {}
    for a in allergenList.keys():
        for i in range(len(allergenList.get(a))):
            if i == 0:
                result[a] = []
                for x in allergenList.get(a)[i]:
                    result[a].append(x)
            else:
                for w in allergenList.get(a)[i]:
                    if w not in result[a]:
                        result[a].append(w)
    searching = True
    while searching:
        for a in result.keys():
            tempResult = result.get(a)
            for i in result.get(a):
                for l in allergenList.get(a):
                    if i not in l:
                        tempResult.remove(i)
                        break
            result[a] = tempResult

        searching = False
        for a in result.keys():
            if len(result.get(a)) > 1:
                searching = True
            else:
                for b in result.keys():
                    if a != b and (result.get(a)[0] in result.get(b)):
                        result[b].remove(result.get(a)[0])

    return result


allergenIngredientsDict = findAllergenIngredient(allergens)

allergenIngredients = []
for a in allergenIngredientsDict.keys():
    for i in allergenIngredientsDict.get(a):
        if i not in allergenIngredients:
            allergenIngredients.append(i)

count = 0

for f in foods:
    for i in f:
        if i not in allergenIngredients:
            count += 1

print("Final count is", count)
print(allergenIngredientsDict)

allergensKeys = allergenIngredientsDict.keys()
secondResult=""
for k in sorted(allergensKeys):
    secondResult += allergenIngredientsDict.get(k)[0]+","

print(secondResult[:-1])
##SUBMIT ME