let pointInArr = (arr, point) => {
  return arr.filter( arrPoint => {
    if( arrPoint[0] === point[0] && arrPoint[1] === point[1]) {
      return true;
    }
    return false;
  }).length;
};

console.log(pointInArr([[1, 2], [3, 4], [5, 6]], [5, 6]));