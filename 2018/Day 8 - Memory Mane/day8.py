numbersFile = open("input2.txt")
numbers = []
for item in numbersFile.readline().split(" "):
    numbers.append(int(item))


class Tree:
    def __init__(self, nodeArray):
        self.nodes = []
        #process array into nodes
        index = 0


    def sumMetaData(self):
        sum = 0
        for n in self.nodes:
            for m in n.metaData:
                sum += 1
        return sum

    def __str__(self):
        for n in self.nodes():
            print(n.metaData)
        return None
class Node:
    def __init__(self, headerArray):
        self.numChildren = headerArray[0]
        self.metaDataLength = headerArray[1]
        self.childNotesData =
        self.metaData = headerArray[-1 * self.metaDataLength:]


tree = Tree(numbers)
print(tree)
print("Sum is",tree.sumMetaData())
