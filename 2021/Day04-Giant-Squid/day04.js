let path = require('path');
let fs = require('fs');

let inputName = './input.txt';

let input = fs.readFileSync(path.resolve(__dirname, inputName)).toString().split(/\r?\n/);

let numbersToCall = input.shift().split(',');
input.shift();


let boards = [[]];
let markedBoards = [[]];
let index = 0;
while (input.length) {
  let current = input.shift();
  if (current === '') {
    index++;
    boards.push([]);
    markedBoards.push([])
  } else {
    boards[index].push(current.trim().split(/ +/));
    markedBoards[index].push(current.trim().split(/ +/).map(ele => ''));
  }
}

function updateAllMarkedBoards(boardArray, value) {
  boardArray.forEach((board, bIndex) => {
    board.forEach((row, rIndex) => {
      row.forEach((element, eIndex) => {
        if (element === value) {
          markedBoards[bIndex][rIndex][eIndex] = '*';
        }
      });
    });
  });
}

function printBoards(boardsArray) {
  boardsArray.forEach(board => {
    board.forEach(row => {
      console.log(row);
    });
    console.log('\n');
  })

}

// returns 0 if no winner, board score if a winner
function determineBoardScore(mBoard, vBoard) {
  // check rows
  let boardIsWinner = false;
  for (let row = 0; row < mBoard.length; row++) {
    if (mBoard[row].every(ele => ele === '*')) {
      boardIsWinner = true;
      break;
    }
  }
  // check cols
  for (let col = 0; col < mBoard[0].length; col++) {
    let colWinner = true;
    for (let row = 0; row < mBoard.length; row++) {
      if (mBoard[row][col] !== '*') {
        colWinner = false;
        break;
      }
    }
    if (colWinner) {
      boardIsWinner = true;
      break;

    }
  }
  if (boardIsWinner) {
    let boardSum = 0;
    for (let row = 0; row < mBoard.length; row++) {
      for (let col = 0; col < mBoard[row].length; col++) {
        if (mBoard[row][col] === '') {
          boardSum += Number(vBoard[row][col]);
        }
      }
    }
    return boardSum;
  } else {
    return 0;
  }
}

function playBingo() {
  let winningBoardScores = [];
  let alreadyWonBoards = [];
  for (let count = 0; count < numbersToCall.length; count++) {
    updateAllMarkedBoards(boards, numbersToCall[count]);
    for (let idx = 0; idx < boards.length; idx++) {
      let currentBoardScore = determineBoardScore(markedBoards[idx], boards[idx]);
      if (currentBoardScore && !alreadyWonBoards.includes(idx)) {
        alreadyWonBoards.push(idx);
        console.log(`Board score is ${currentBoardScore} and numberCalled is ${numbersToCall[count]}`);
        winningBoardScores.push(currentBoardScore * numbersToCall[count]);
      }
    }
  }
  return winningBoardScores[winningBoardScores.length - 1];
}

console.log(playBingo());