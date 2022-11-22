const score = (scoreArr, dieRolls) => {
  return dieRolls * Math.min(...scoreArr)
};

const makeRollDie = () => {
  let currentDie = 1

  const nextDie = () => {
    currentDie += 1
    if (currentDie === 101) currentDie = 1
  };

  return function () {
    let sum = currentDie
    nextDie()
    sum += currentDie
    nextDie()
    sum += currentDie
    nextDie()
    return sum
  };
};

const playGame = (startingArr) => {
  let dieRolls = 0
  let scoreArr = [0, 0]
  let rollDie = makeRollDie()
  while (scoreArr.every(val => val < 1000)) {
    startingArr[0] = startingArr[0] + rollDie()
    dieRolls += 3
    while (startingArr[0] > 10) {
      startingArr[0] -= 10
    };
    scoreArr[0] += startingArr[0]
    if (scoreArr[0] >= 1000) {
      break
    };
    startingArr[1] = startingArr[1] + rollDie()
    dieRolls += 3
    while (startingArr[1] > 10) {
      startingArr[1] -= 10
    };
    scoreArr[1] += startingArr[1]
  };

  return score(scoreArr, dieRolls)
};

const movePlayer = (position, amount) => {
  let newPosition = position + amount
  while (newPosition > 10) {
    newPosition -= 10
  };
  return newPosition
}

const generateNewArrs = (startingArr, scoreArr, change, playerTurn) => {
  const newPos = startingArr.slice()
  const newScore = scoreArr.slice()
  let position = startingArr[playerTurn] + change
  while (position > 10) {
    position -= 10
  };
  newPos[playerTurn] = position
  newScore[playerTurn] += position
  return [newPos, newScore]
}
// key - String(startingArr)+String(scoreArr) - value - win array
const quantumResults = {}

const getKey = (startingArr, scoreArr, currentPlayerTurn) => {
  return startingArr.toString() + '|' + currentPlayerTurn + '|' + scoreArr.toString()
};

const playQuantum = (startingArr, scoreArr, currentPlayerTurn) => {
  if (quantumResults[getKey(startingArr, scoreArr, currentPlayerTurn)]) {
    return quantumResults[getKey(startingArr, scoreArr, currentPlayerTurn)]
  };

  let winArr = [0, 0]
  if (scoreArr[0] >= 21) {
    winArr[0] += 1
  } else if (scoreArr[1] >= 21) {
    winArr[1] += 1
  } else {
    let nextPlayer = (currentPlayerTurn + 1) % 2

    let r1 = playQuantum(...generateNewArrs(startingArr, scoreArr, 9, currentPlayerTurn), nextPlayer)
    winArr[0] += r1[0]
    winArr[1] += r1[1]

    let r2 = playQuantum(...generateNewArrs(startingArr, scoreArr, 8, currentPlayerTurn), nextPlayer)
    winArr[0] += (3 * r2[0])
    winArr[1] += (3 * r2[1])

    let r3 = playQuantum(...generateNewArrs(startingArr, scoreArr, 7, currentPlayerTurn), nextPlayer)
    winArr[0] += (6 * r3[0])
    winArr[1] += (6 * r3[1])

    let r4 = playQuantum(...generateNewArrs(startingArr, scoreArr, 6, currentPlayerTurn), nextPlayer)
    winArr[0] += (7 * r4[0])
    winArr[1] += (7 * r4[0])

    let r5 = playQuantum(...generateNewArrs(startingArr, scoreArr, 5, currentPlayerTurn), nextPlayer)
    winArr[0] += (6 * r5[0])
    winArr[1] += (6 * r5[1])
    // console.log(winArr)

    let r6 = playQuantum(...generateNewArrs(startingArr, scoreArr, 4, currentPlayerTurn), nextPlayer)
    winArr[0] += (3 * r6[0])
    winArr[1] += (3 * r6[1])

    let r7 = playQuantum(...generateNewArrs(startingArr, scoreArr, 3, currentPlayerTurn), nextPlayer)
    winArr[0] += r7[0]
    winArr[1] += r7[1]
  };
  quantumResults[getKey(startingArr, scoreArr, currentPlayerTurn)] = winArr.slice()
  return winArr.slice()
};

module.exports = {
  makeRollDie,
  playGame,
  playQuantum,
  generateNewArrs,
};
