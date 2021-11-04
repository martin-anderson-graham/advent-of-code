import string

orderFile = open("input.txt")

# key requires all values
orders = {}
for line in orderFile:
    temp = line.rstrip().split(" ")
    if temp[7] in orders.keys():
        orders[temp[7]].append(temp[1])
    else:
        orders[temp[7]] = [temp[1]]

# need to add an empty entry for the last one
toAdd = {}
for k in orders:
    for v in orders.get(k):
        if v not in orders:
            toAdd[v] = []
for a in toAdd:
    orders[a] = []

building = True
while building:
    building = False
    for k in orders:
        for v in orders.get(k):
            for t in orders.get(v):
                if t not in orders.get(k):
                    orders.get(k).append(t)
                    building = True

alpha = string.ascii_uppercase
step = 0
completed = []
timeHopper = {}
time = 0
workers = 5
offset = 60

while len(completed) < len(orders.keys()):
    toStart = []
    for k in orders:
        if k in completed:
            continue
        readyToStart = True
        for v in orders.get(k):
            if v not in completed:
                readyToStart = False
        if readyToStart and k not in timeHopper:
            toStart.append(k)
    toStart.sort()
    for a in toStart:
        if len(timeHopper) < workers:
            timeHopper[a] = offset + 1 + alpha.find(a)
    # clear the hopper
    toRemove = []
    for k in timeHopper:
        timeHopper[k] -= 1
        if timeHopper[k] == 0:
            completed.append(k)
            toRemove.append(k)
    for r in toRemove:
        timeHopper.__delitem__(r)
    time += 1

answer = ""
for l in completed:
    answer += l

print("Final order is", answer)
print("Time to finish is", time)
