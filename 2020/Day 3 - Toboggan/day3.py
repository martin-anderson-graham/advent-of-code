treeFile=open("input.txt")
trees=[]
for f in treeFile:
    trees.append(f.rstrip())
treeFile.close()




slopes=[[1,1],[3,1],[5,1],[7,1],[1,2]]
treeProduct=1

for slopeArray in slopes:
    deltax=slopeArray[0]
    deltay=slopeArray[1]
    xpos=0
    ypos=0
    treeCount=0

    while ypos<len(trees):
        if trees[ypos][xpos%len(trees[ypos])]=='#':
            treeCount+=1
        xpos+=deltax
        ypos+=deltay
    treeProduct*=treeCount

print("Total tree product isTree count is ",treeProduct)


