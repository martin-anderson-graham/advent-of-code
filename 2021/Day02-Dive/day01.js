

var fs = require('fs');
var path = require('path');

var input = fs.readFileSync(path.resolve(__dirname, "./testinput.txt")).toString().split("\n");

let horizontalPosition = 0;
let depth = 0;
let aim = 0;

let parseCommand = (arr) => {
  let tempCommand = arr.split(' ');
  return [tempCommand[0].toLowerCase(), Number(tempCommand[1])];
};

input.forEach( command => {
  let parsedCommand = parseCommand(command);
  switch (parsedCommand[0]) {
    case 'forward':
      horizontalPosition += parsedCommand[1];
      depth += (aim * parsedCommand[1]);
      break;
    case 'up':
      aim -= parsedCommand[1];
      break;
    case 'down':
      aim += parsedCommand[1];
      break;
    default:
  }
});


console.log(horizontalPosition * depth);

