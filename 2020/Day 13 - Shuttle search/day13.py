idFile = open("input.txt").readlines()

targetTime = int(idFile[0].rstrip())
ids = {}  # id value followed by offset from first number
count = 0
firstKey = 0
idKeys = []
for a in idFile[1].rstrip().split(','):
    # for a in [1789,37,47,1889]:
    if a != 'x':
        ids[int(a)] = count
        idKeys.append(int(a))
    if count == 0:
        firstKey = int(a)
    count += 1


def earliestValidArrival(depart_time, id_value):
    time = 0
    while time < depart_time:
        time += id_value
    return time


waitTimes = {}
minWaitTime = 2 * targetTime
result = 0
for i in ids.keys():
    iTime = earliestValidArrival(targetTime, i) - targetTime
    waitTimes[i] = iTime
    if iTime < minWaitTime:
        minWaitTime = iTime
        result = i * minWaitTime

print("First result is", result)

number = 0
step = firstKey
for i in range(len(idKeys[:-1])):
    while True:
        number += step
        if (number + ids.get(idKeys[i + 1])) % idKeys[i + 1] == 0:
            step = step * idKeys[i + 1]
            break

print("Second result is", number)
