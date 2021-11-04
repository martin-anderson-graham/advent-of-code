def fuelForMass(mass):
    return(int(mass/3)-2)
     
def totalFuelForModuleList():
    moduleListFile=open("C:/Users/agraham/Google Drive/Spare Time/Python/AdventOfCode/Day 1/moduleList.txt")
    moduleList=[]
    for f in moduleListFile:
        moduleList.append(int(f))
    
    sum=0
    for m in moduleList:
        fuelForModule=0
        fuelForModule+=fuelForMass(m)
        massToFuel=fuelForModule
        while fuelForMass(massToFuel)>0:
            massToFuel=fuelForMass(massToFuel)
            fuelForModule+=massToFuel
        sum+=fuelForModule   

    return sum
     

print("Total fuel necessary is",totalFuelForModuleList())


