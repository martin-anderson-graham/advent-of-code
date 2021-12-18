let findN = (arr) => {
  for (let idx = 0; idx < arr.length; idx++) {
    let left = arr.slice(0,idx);
    let right = arr.slice(idx + 1);
    if( sumArr(left) === sumArr(right)) {
      return idx;
    }
  }
  return -1;
}

function sumArr (arr) {
  return arr.reduce( (sum, ele) => sum + ele, 0);
}

console.log(findN([-1,-2,-3,-4,-3,-2,-1]));