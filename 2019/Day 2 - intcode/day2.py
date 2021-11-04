def opCode(tempOpArray, tempCompleteArray):  ##returns array of results [value, indexToPlaceValue, how far to advance pointer]
    resultArray=[0,0,0]
    if tempOpArray[0]==1:
        resultArray[0]=tempCompleteArray[tempOpArray[1]]+tempCompleteArray[tempOpArray[2]]
        resultArray[1]=tempOpArray[3]
        resultArray[2]=4
    elif tempOpArray[0]==2:
        resultArray[0]=tempCompleteArray[tempOpArray[1]]*tempCompleteArray[tempOpArray[2]]
        resultArray[1]=tempOpArray[3]
        resultArray[2]=4
    elif tempOpArray[0]==99:
        return(resultArray,True)
    return(resultArray,False)

intcode=[1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,19,10,23,2,13,23,27,1,5,27,31,2,6,31,35,1,6,35,39,2,39,9,43,1,5,43,47,1,13,47,51,1,10,51,55,2,55,10,59,2,10,59,63,1,9,63,67,2,67,13,71,1,71,6,75,2,6,75,79,1,5,79,83,2,83,9,87,1,6,87,91,2,91,6,95,1,95,6,99,2,99,13,103,1,6,103,107,1,2,107,111,1,111,9,0,99,2,14,0,0]
##intcode=[1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,19,10,23,2,13,23,27,1,5,27,31,2,6,31,35,1,6,35,39,2,39,9,43,1,5,43,47,1,13,47,51,1,10,51,55,2,55,10,59,2,10,59,63,1,9,63,67,2,67,13,71,1,71,6,75,2,6,75,79,1,5,79,83,2,83,9,87,1,6,87,91,2,91,6,95,1,95,6,99,2,99,13,103,1,6,103,107,1,2,107,111,1,111,9,0,99,2,14,0,0]
##intcode=[2,4,4,5,99,0]


n=-1
v=0
testintcode=[]
for k in range(len(intcode)):
    testintcode.append(intcode[k])
    
while testintcode[0]!=19690720:
    n+=1
    if n==100:
        n=0
        v+=1
        if v==100:
            break
    for k in range(len(intcode)):
        testintcode[k]=intcode[k]
    testintcode[1]=n
    testintcode[2]=v
    p=0
    
    while p<(len(testintcode)-3):
        postOpArray,shouldHalt = opCode([testintcode[p],testintcode[p+1],testintcode[p+2],testintcode[p+3]],testintcode)
        if shouldHalt:
            break
        else:
            testintcode[postOpArray[1]]=postOpArray[0]
            p+=postOpArray[2]
  
    
##print(intcode)
print(intcode[0])
print(n)
print(v)
print(100*n+v)