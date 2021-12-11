let flashRecord = [[true, false], [true, true]];
console.log (flashRecord.reduce( (sum, row) => sum + row.reduce( (sum, ele) => sum + Number(ele) , 0) , 0));