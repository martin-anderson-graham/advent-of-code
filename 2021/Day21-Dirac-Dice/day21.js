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

module.exports = {
  makeRollDie,
  playGame,
};
