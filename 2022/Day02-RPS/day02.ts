const parseInput = (str: string): string[][] => {
  return str.split("\n").map((r) => r.split(" "));
};

type myPlays = "X" | "Y" | "Z";
type gamePlay = "AX" | "AY" | "AZ" | "BX" | "BY" | "BZ" | "CX" | "CY" | "CZ";

const scores: Record<myPlays | gamePlay, number> = {
  X: 1,
  Y: 2,
  Z: 3,
  AX: 3,
  BY: 3,
  CZ: 3,
  AZ: 0,
  BX: 0,
  CY: 0,
  AY: 6,
  BZ: 6,
  CX: 6,
};

const scoreGame = (gameArr: string[], partNum = 1): number => {
  if (partNum === 2) {
    return scores2[gameArr[1]] + scores2[`${gameArr[0]}${gameArr[1]}`];
  }
  return scores[gameArr[1]] + scores[`${gameArr[0]}${gameArr[1]}`];
};

const totalScore = (gameArrs: string[][], partNum = 1): number => {
  return gameArrs.reduce(
    (sum: number, gameArr) => sum + scoreGame(gameArr, partNum),
    0
  );
};

const scores2: Record<myPlays | gamePlay, number> = {
  X: 0,
  Y: 3,
  Z: 6,
  AX: 3,
  BY: 2,
  CZ: 1,
  AZ: 2,
  BX: 1,
  CY: 3,
  AY: 1,
  BZ: 3,
  CX: 2,
};

export { parseInput, scoreGame, totalScore };
