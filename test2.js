let fuelSums = [34, 20, 70];

console.log(fuelSums.reduce( (min, ele) => {
  if (ele < min) {
    return ele;
  } else {
    return min;
  }
}, 1000000));

