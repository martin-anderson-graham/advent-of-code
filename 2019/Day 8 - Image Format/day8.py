def createPixelArray(width,height,pixels):
    result=[[[]]]
    lineCount=0
    layer=0
    for i in pixels:
        if len(result[layer][lineCount])==width:
            lineCount+=1
            if lineCount==height:
                lineCount=0
                layer+=1
                result.append([])
            result[layer].append([])
        result[layer][lineCount].append(i)

    return result

def countDigits(pixelLayer): #takes an individual layer array (2d)
    maxDigit=0
    for r in pixelLayer:
        for v in r:
            if v>maxDigit:
                maxDigit=v
    digitCount=[0]*(maxDigit+1) #index is the digit which is counted
    for r in pixelLayer:
        for v in r:
            digitCount[v]+=1
    return digitCount

def calculateFinalImage(imageArray,width,height):
    result=[]
    print(result)
    for x in range(height):
        result.append([])
        for y in range(width):
            result[x].append(0)
            layer=0
            while imageArray[layer][x][y]==2:
                layer+=1
            result[x][y]=imageArray[layer][x][y]
    return result

def displayFinalImage(result):
    for k in result:
        tempStr=""
        for a in k:
            if a==1:
                tempStr+="0"
            else:
                tempStr+=" "
        print(tempStr)

imageFile=open("C:/Users/agraham/Google Drive/Spare Time/Python/AdventOfCode/Day 8 - Image Format/input.txt")
line=imageFile.readline()
pixels=[]
for i in line.rstrip():
    pixels.append(int(i))

width=25
height=6
imageArray=createPixelArray(width,height,pixels)

result=calculateFinalImage(imageArray,width,height)
displayFinalImage(result)
