import re
#  [1518-07-03 23:58]

class TimeEntry:
    def __init__(self, timestring):
        tempTime = re.split('-| |:', timestring[1:-1])
        self.raw = timestring
        self.id = int(tempTime[0]+tempTime[1]+tempTime[2]+tempTime[3]+tempTime[4])
        self.year = int(tempTime[0])
        self.month = int(tempTime[1])
        self.day = int(tempTime[2])
        self.hour = int(tempTime[3])
        self.minute = int(tempTime[4])

    def __repr__(self):
        return self.raw

    def getID(self):
        return self.id



class Guard:
    def __init__(self, idstring):
        self.id = guardNumber
        self.events = []

    def addEvent(self, TE, typeString):  #event is a TimeEntry, type - tyepes can be 'start', 'sleep', 'wake'
        self.events.append([TE, typeString])

    def countMinutesAsleep(self):
        sleepStart = 0
        totalTimeAsleep = 0
        for event in self.events:
            if event[1] == "sleep":
                sleepStart = event[0].minute
            elif event[1] == "wake":
                totalTimeAsleep += event[0].minute - sleepStart
        return totalTimeAsleep

    def findMostAsleepMin(self):
        minutes = [0]*60
        sleepStart = 0
        for event in self.events:
            if event[1] == "sleep":
                sleepStart = event[0].minute
            elif event[1] == "wake":
                for i in range(sleepStart, event[0].minute):
                    minutes[i] += 1
        return minutes.index(max(minutes)), max(minutes)

entryFile = open("input.txt")
entries = {}
for line in entryFile:
    entries[TimeEntry(line[:18])] = line[19:].rstrip()

entryFile.close()


sortedKeys = sorted(entries.keys(), key = lambda x: x.getID())

guards = []
guardIndex = 0

for k in sortedKeys:
    if entries[k][:5] == "Guard":
        guardIndex = 0
        guardNumber = int(entries[k].split(" ")[1][1:])
        for g in guards:
            if guardNumber == g.id:
                guards[guardIndex].addEvent(k, "start")
                break
            else:
                guardIndex += 1
        if guardIndex >= len(guards):
            guards.append(Guard(guardNumber))
            guards[guardIndex].addEvent(k, "start")

    elif entries[k] == "falls asleep":
        guards[guardIndex].addEvent(k, "sleep")
    elif entries[k] == "wakes up":
        guards[guardIndex].addEvent(k, "wake")

maxSleepAmount = 0
bestMinute = 0
maxGuardID = 0

for g in guards:
    if g.countMinutesAsleep() > maxSleepAmount:
        maxSleepAmount = g.countMinutesAsleep()
        bestMinute, y = g.findMostAsleepMin()
        maxGuardID = g.id

print("The best guard is", maxGuardID)
print("The best minute is", bestMinute)
print("The product is", bestMinute*maxGuardID)

maxSleepAmount = 0
bestMinute = 0
maxGuardID = 0

for g in guards:
    if g.findMostAsleepMin()[1] > maxSleepAmount:
        bestMinute, maxSleepAmount = g.findMostAsleepMin()
        maxGuardID = g.id

print("The best guard is", maxGuardID)
print("The best minute is", bestMinute)
print("The product is", bestMinute*maxGuardID)










