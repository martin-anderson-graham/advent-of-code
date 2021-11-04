def totalOrbits(orbits):  #total number of direct and indirect orbits in given dictionary values
    total=0
    for a in orbits.values():
        total+=len(a)
    return total

inputfile=open("C:/Users/agraham/Google Drive/Spare Time/Python/AdventOfCode/Day 6 - Orbits/input.txt")
input=[]
for line in inputfile:
    input.append(line.rstrip())
inputfile.close()

directOrbits={}


for o in input: #create dictionary of direct orbit - oribiter is the key, orbitee the value
    tempPair=o.split(')')
    directOrbits[tempPair[1]]=tempPair[0]


allOrbits={} #includes directorbits as well
orbitsToPop=[]
for x,y in directOrbits.items(): #seed the original orbit - orbitee is the key, orbiters are values
    if y=='COM':
        allOrbits[x]=['COM']
        orbitsToPop.append(x)
for a in orbitsToPop:
    directOrbits.pop(a)


while len(directOrbits)>0:
    #print(directOrbits)
    orbitsToPop=[]
    orbitsToAdd={}
    orbitsToAdd.clear()
    for a in allOrbits.keys():
        for k,dk in directOrbits.items():
            if dk == a:
                orbitsToAdd[k]=allOrbits[a]+[dk]
                orbitsToPop.append(k)
    for i in orbitsToPop:
        directOrbits.pop(i)
    for x,y in orbitsToAdd.items():
        allOrbits[x]=y

print("Total number of direct and indirect orbits is",totalOrbits(allOrbits))

yourOrbit=allOrbits['YOU'].copy()
santasOrbit=allOrbits['SAN'].copy()

for a in yourOrbit:
    for b in santasOrbit:
        if a==b:
            commonPlanet=a

numXfers=0
for a in yourOrbit[yourOrbit.index(commonPlanet):-1]:
    numXfers+=1
for a in santasOrbit[santasOrbit.index(commonPlanet):-1]:
    numXfers+=1
print("Number of xfers is:",numXfers)
