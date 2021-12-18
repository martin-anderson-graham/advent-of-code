let path = require('path');
let fs = require('fs');

let inputString = './input.txt';

let input = fs.readFileSync(path.resolve(__dirname, inputString)).toString();

let totalVersion  = 0;

let binaryFromBaseTen = (number) => {
  let result = '';
  let exp = 3;
  while (result.length < 4) {
    if (number >= Math.pow(2, exp)) {
      result += '1';
      number -= Math.pow(2, exp);
    } else {
      result += '0';
    }
    exp--;
  }
  return result;
};

let binArray = [];
for (let idx = 0; idx < input.length; idx++) {
  binArray.push(binaryFromBaseTen(parseInt(input[idx], 16)));
}

let packetString = binArray.reduce((sum, ele) => sum + ele, '');
// while (packetString[packetString.length - 1] === '0') {
//   packetString = packetString.slice(0, packetString.length - 1);
// } 

let parsePacket = (packetString) => {
  let result = {}
  result.version = parseInt(packetString.slice(0, 3), 2);
  totalVersion += result.version;
  result.type = parseInt(packetString.slice(3, 6), 2);
  packetString = packetString.slice(6);
  result.value = [];
  let subPackets = [];
  if (result.type === 4) {
    while (true) {
      result.value.push(packetString.slice(1, 5));
      if (packetString[0] === '0' || packetString.length <= 0) {
        packetString = packetString.slice(5);
        break;
      }
      packetString = packetString.slice(5);
    }
    result.value = parseInt(result.value.reduce((str, ele) => str + ele, ''), 2);
  } else if(result.type !== 4) {
    if(packetString[0] === '0'){
      let subPacketLength = parseInt(packetString.slice(1,16), 2);
      let subPacketString = packetString.slice(16, subPacketLength + 16);
      packetString = packetString.slice(subPacketLength + 16);
      while(subPacketString.length > 0){
        let subPacket = {};
        [subPacket, subPacketString] = parsePacket(subPacketString);
        subPackets.push(subPacket);
      }

    } else {
      let numSubPackets = parseInt(packetString.slice(1,12), 2);
      packetString = packetString.slice(12);
      while(subPackets.length < numSubPackets) {
        let subPacket = {};
        [subPacket, packetString] = parsePacket(packetString);
        subPackets.push(subPacket);
      }
    }
  } if( result.type === 0) {
    let sum = 0;
    for (let sub of subPackets) {
      sum += sub.value;
    }
    result.value = sum;
  } else if (result.type === 1) {
    let product = 1;
    for (let sub of subPackets) {
      product *= sub.value;
    }
    result.value = product;
  } else if (result.type === 2) {
    let min = Number.MAX_SAFE_INTEGER;
    for (let sub of subPackets) {
      if (sub.value < min) {
        min = sub.value;
      }
    }
    result.value = min;
  } else if (result.type === 3) {
    let max = Number.MIN_SAFE_INTEGER;
    for (let sub of subPackets) {
      if (sub.value > max) {
        max = sub.value;
      }
    }
    result.value = max;
  } else if (result.type === 5) {
    if (subPackets[0].value > subPackets[1].value) {
      result.value = 1;
    } else {
      result.value = 0;
    }
  } else if (result.type === 6) {
    if (subPackets[0].value < subPackets[1].value) {
      result.value = 1;
    } else {
      result.value = 0;
    }
  }  else if (result.type === 7) {
    if (subPackets[0].value === subPackets[1].value) {
      result.value = 1;
    } else {
      result.value = 0;
    }
  }
  return [result, packetString];
};
let packet = {};
console.log(parsePacket(packetString)[0])
