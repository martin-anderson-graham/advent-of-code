let path = require('path');
let fs = require('fs');

let inputString = './input.txt';

let input = fs.readFileSync(path.resolve(__dirname, inputString)).toString().split(/\r?\n/).map(ele => ele.split('-'));

let paths = [['start']];


let isSmallRoom = (str) => {
  return !str.split('').every(char => 'A' <= char && char <= 'Z');
}

let validRoomVisit = (path, room) => {
  let visitedSmallRoomCount = {};
  visitedSmallRoomCount[room] = 1;
  if (room === 'end') {
    return true;
  } else if (room === 'start') {
    return false;
  }
  if (!isSmallRoom(room)) {
    return true;
  } else {
    for (let idx = 0; idx < path.length; idx++) {
      visitedSmallRoomCount[path[idx]] = visitedSmallRoomCount[path[idx]] + 1 || 1;
      if (visitedSmallRoomCount[path[idx]] === 3 && isSmallRoom(path[idx])) {
        return false;
      }
    }
  }

  let smallRoomsVisitedTwice = [];
  for (let entry of Object.entries(visitedSmallRoomCount)) {
    if (isSmallRoom(entry[0])) {
      if (entry[1] > 1) {
        smallRoomsVisitedTwice.push(entry[0]);
      }
    }
  }
  return smallRoomsVisitedTwice.length < 2;
}


// paths must be able to go backwards!
// not checking for repeats as no big rooms are adjacent
let addPathsFromRoom = (path) => {
  let result = [];
  let room = path[path.length - 1];

  input.forEach(connection => {
    if (connection[0] === room && connection[1] !== 'start') {
      if (validRoomVisit(path, connection[1])) {
        let newPath = path.slice();
        newPath.push(connection[1]);
        result.push(newPath);
      }
    } else if (connection[1] === room && connection[0] !== 'start') {
      if (validRoomVisit(path, connection[0])) {
        let newPath = path.slice();
        newPath.push(connection[0]);
        result.push(newPath);
      }
    }
  });
  return result;
}

let buildPaths = () => {
  let searching = true;
  while (searching) {
    let newPaths = [];
    searching = false;
    paths.forEach(path => {
      if (path[path.length - 1] === 'end') {
        newPaths.push(path);
      } else {
        searching = true;
        newPaths.push(...addPathsFromRoom(path));
      }
    });

    paths = newPaths.slice();
  }
}

buildPaths();
console.log(paths.length);
/*
let stringArr = [];
for( let p of paths) {
  stringArr.push(p);
}
stringArr.sort();
for (let p of stringArr) {
  console.log(p);
}
*/









