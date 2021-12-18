let path = require('path');
let fs = require('fs');

let inputString = './input.txt';

let input = fs.readFileSync(path.resolve(__dirname, inputString)).toString().split(' ');


let xArr = input[2].slice(2, input[2].length - 1).split('..').map( ele => Number(ele));
let yArr = input[3].slice(2).split('..').map( ele => Number(ele));

let probe = {
  xpos: 0, 
  ypos:0,
  xvel: 1,
  yvel: 1, 
  maxY: 0,
  updatePosition(){
    this.xpos += this.xvel;
    this.ypos += this.yvel;
    if(this.ypos > this.maxY) {
      this.maxY = this.ypos;
    }
    if (this.xvel < 0) {
      this.xvel++;
    } else if( this.xvel > 0) {
      this.xvel--;
    }
    this.yvel--;
  },
  getPosition(){
    return [this.xpos, this.ypos];
  }, 
  resetProbe(xv, yv){
    this.xpos = 0;
    this.ypos = 0;
    this.xvel = xv;
    this.yvel = yv;
    this.maxY = 0;
  },
  inTarget(xArr, yArr) {
    if(this.xpos >= xArr[0] && this.xpos <= xArr[1]) {
      if(this.ypos >= yArr[0] && this.ypos <= yArr[1]){
        return true;
      }
    }
    return false;
  },
  hitsTarget(xArr, yArr) {
    while(true){
      if(this.inTarget(xArr, yArr)){
        return true;
      } else if (this.xpos > xArr[1]) {
        return false;
      } else if (this.ypos < yArr[0]) {
        return false;
      }
      this.updatePosition();
    }
  }
}

let numberOfSteps = (xArr, yArr, xVel) => {
  return Math.floor(xArr[1] / xVel) + 1;
};

let max = 0;
let count = 0;
for(let x = 1; x < xArr[1] + 1; x++) {
  for (let y = yArr[0]; y < 1000 ; y++) {
    probe.resetProbe(x,y);
    if(probe.hitsTarget(xArr, yArr)){
      count++;
      if(probe.maxY > max) {
        max = probe.maxY;
      }
    }
  }
}

console.log(max, count);
//4186