deckFile = open("input.txt")
deck1 = []
deck2 = []

currentDeck = 1
for line in deckFile:
    if line.rstrip() == "":
        continue
    if line.rstrip() == "Player 1:":
        continue
    if line.rstrip() == "Player 2:":
        currentDeck += 1
        continue
    if currentDeck == 1:
        deck1.append(int(line.rstrip()))
    elif currentDeck == 2:
        deck2.append(int(line.rstrip()))

deckFile.close()


class Game:
    def __init__(self, deckP1, deckP2):
        self.d1 = deckP1
        self.d2 = deckP2
        self.roundCount = 1
        self.gameScore = 0
        self.gameOver = False
        self.gameWinner = 0
        self.roundList = []

    def round(self):
        self.roundCount += 1
        if self.checkForInstantWin():
            self.gameWinner = 1
        elif len(self.d1) > self.d1[0] and len(self.d2) > self.d2[0]:
            subGame = Game(self.d1[1:self.d1[0]+1], self.d2[1:self.d2[0]+1])
            subGame.playGame()
            if subGame.gameWinner == 1:
                self.d1.append(self.d1[0])
                self.d1.append(self.d2[0])
                self.d1 = self.d1[1:]
                self.d2 = self.d2[1:]
            else:
                self.d2.append(self.d2[0])
                self.d2.append(self.d1[0])
                self.d1 = self.d1[1:]
                self.d2 = self.d2[1:]
        elif self.d1[0] > self.d2[0]:
            self.d1.append(self.d1[0])
            self.d1.append(self.d2[0])
            self.d1 = self.d1[1:]
            self.d2 = self.d2[1:]
        elif self.d1[0] < self.d2[0]:
            self.d2.append(self.d2[0])
            self.d2.append(self.d1[0])
            self.d1 = self.d1[1:]
            self.d2 = self.d2[1:]
        if len(self.d1) == 0 or len(self.d2) == 0:
            self.gameOver = True
        return None

    def playGame(self):
        while not self.gameOver:
            self.round()
        if len(self.d1) == 0:
            self.evaluateGameScore(self.d2)
            self.gameWinner = 2
        else:
            self.evaluateGameScore(self.d1)
            self.gameWinner = 1

        return None

    def evaluateGameScore(self, deck):
        deckLength = len(deck)
        score = 0
        for c in range(len(deck)):
            score += deckLength * deck[c]
            deckLength += -1

        self.gameScore = score

    def checkForInstantWin(self):
        d1sum = ""
        d2sum = ""
        for a in range(len(self.d1)):
            d1sum += str(self.d1[a])
        for b in range(len(self.d1)):
            d2sum += str(self.d1[b])
        result  = d1sum + d2sum
        if result in self.roundList:
            self.gameOver = True
        else:
            self.roundList.append(result)

        return self.gameOver


crabGame = Game(deck1, deck2)
crabGame.playGame()
print(crabGame.gameScore,"the second result")
