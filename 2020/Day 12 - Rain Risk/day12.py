actionFile = open("input.txt")
actions = []
for l in actionFile:
    actions.append(l.rstrip())
actionFile.close()


class Ship:
    def __init__(self):
        self.pos = [0, 0]
        self.waypointQuadrant = 1
        self.headingDict = {0: "N", 90: "E", 180: "S", 270: "W"}
        self.wayPoint = [10, 1]

    def verifyWaypointQuadrant(self):
        if self.wayPoint[0] > 0 and self.wayPoint[1] > 0:
            self.waypointQuadrant = 1
        elif self.wayPoint[0] > 0 and self.wayPoint[1] < 0:
            self.waypointQuadrant = 2
        elif self.wayPoint[0] < 0 and self.wayPoint[1] < 0:
            self.waypointQuadrant = 3
        elif self.wayPoint[0] < 0 and self.wayPoint[1] > 0:
            self.waypointQuadrant = 4
        return None

    def getManhattanDistance(self):
        return abs(self.pos[0]) + abs(self.pos[1])

    def updatePosition(self, stringcommand):
        code = stringcommand[0]
        value = int(stringcommand[1:])
        if code == "F":
            for i in range(value):
                self.pos[0] += self.wayPoint[0]
                self.pos[1] += self.wayPoint[1]
        if code == "N":
            self.wayPoint[1] += value
        elif code == "S":
            self.wayPoint[1] += -1 * value
        elif code == "E":
            self.wayPoint[0] += value
        elif code == "W":
            self.wayPoint[0] += -1 * value
        self.verifyWaypointQuadrant()


        if code == "L":
            #print(self.wayPoint, self.waypointQuadrant, stringcommand)
            self.waypointQuadrant += -1 * value/90
            while self.waypointQuadrant <= 0:
                self.waypointQuadrant += 4
        elif code == "R":
            #print(self.wayPoint, self.waypointQuadrant, stringcommand)
            self.waypointQuadrant += value/90
            while self.waypointQuadrant > 4:
                self.waypointQuadrant += -4

        if code == "L" or code == "R":
            if value != 180:
                tempWaypoint = self.wayPoint.copy()
                self.wayPoint[0] = tempWaypoint[1]
                self.wayPoint[1] = tempWaypoint[0]
            if self.waypointQuadrant == 1:
                self.wayPoint[0] = abs(self.wayPoint[0])
                self.wayPoint[1] = abs(self.wayPoint[1])
            elif self.waypointQuadrant == 2:
                self.wayPoint[0] = abs(self.wayPoint[0])
                self.wayPoint[1] = -1 * abs(self.wayPoint[1])
            elif self.waypointQuadrant == 3:
                self.wayPoint[0] = -1 * abs(self.wayPoint[0])
                self.wayPoint[1] = -1 * abs(self.wayPoint[1])
            elif self.waypointQuadrant == 4:
                self.wayPoint[0] = -1 * abs(self.wayPoint[0])
                self.wayPoint[1] = abs(self.wayPoint[1])
            #print(self.wayPoint, self.waypointQuadrant)



ship = Ship()
print(ship.pos, ship.wayPoint)
for a in actions:
    ship.updatePosition(a)
    print(a, "pos",ship.pos,"wp",ship.wayPoint)

print("Final manhattan distance is", ship.getManhattanDistance())
