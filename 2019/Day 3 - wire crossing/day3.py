class Path:
    occupiedCells=[]

    def __init__(self,tempPathList):   
      self.occupiedCells=[]
      x=0
      y=0
      for i in tempPathList:
        value=int(i[1:])
        if i[0]=='R':
            for v in range(value):
                x+=1
                self.occupiedCells.append([x,y])
        elif i[0]=='L':
            for v in range(value):
                x+=-1
                self.occupiedCells.append([x,y])
        elif i[0]=='U':
            for v in range(value):
                y+=1
                self.occupiedCells.append([x,y])
        elif i[0]=='D':
            for v in range(value):
                y+=-1
                self.occupiedCells.append([x,y])
      print(len(self.occupiedCells))
        

#takes two paths and returns intersection with the minimum delay
def findMinDelayIntersection(path1, path2):
    result=[0,0,len(path1.occupiedCells)]
    for a in range(len(path1.occupiedCells)):
        if a%1000==0:
            print(a)
        if a > result[2]:
            break
        targetCell=path1.occupiedCells[a]
        try:
            matchCellIndex=path2.occupiedCells.index(targetCell)
            delay=a+matchCellIndex+2 #to account for zero starting value
            if delay<result[2]:
                result=[targetCell[0],targetCell[1],delay]
                print(result,a)
        except:
            continue
    return result

#parsing the file into a list of list of string instructions      
wirePathFile=open("C:/Users/agraham/Google Drive/Spare Time/Python/AdventOfCode/Day 3/input.txt") 
#wirePatFile=open("C:/Users/agraham/Google Drive/Spare Time/Python/AdventOfCode/Day 3/input2.txt") 
wirePathList=[]  


while True:
    k=wirePathFile.readline()
    if len(k)==0:
        break
    tempList=[]
    while True:
        index=k.find(',')
        if index==-1:
            tempList.append(k[:-1])  #adds the last item before quitting
            break
        tempList.append(k[0:index])
        k=k[index+1::]
    wirePathList.append(tempList)    
wirePathFile.close()   


pathList =[]  

for a in wirePathList:
    pathList.append(Path(a))




print(findMinDelayIntersection(pathList[0],pathList[1]))

    
