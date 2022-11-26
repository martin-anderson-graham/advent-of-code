const parseRules = (rulesString) => {
  return rulesString.split('\n').map(row => {
    let topLevel = row.split(' ')
    let action = topLevel[0]
    let vector = topLevel[1].split(',').map(statement => {
      return statement.slice(2).split('..').map(n => Number(n))
    });
    return {action, vector}
  });
};
// [{action: on/off, vector: [start, end]}]
const buildIntervals = (rulesArr1D, limit) => {
  const checkPoints = []
  rulesArr1D.forEach((rule, idx) => {
    checkPoints.push({id: idx, value: rule.vector[0] - 0.5, start: true})
    checkPoints.push({id: idx, value: rule.vector[1] + 0.5, start: false})
  })
  checkPoints.sort((a, b) => {
    if (a.value === b.value) {
      return Number(a.id) - Number(b.id)
    } else {
      return a.value - b.value
    };
  });

  // {value: [2, 3], id: '1-2'},
  let interval = []
  let openIntervals = []

  for (let i = 0; i < checkPoints.length - 1; i++) {
    let current = checkPoints[i]
    let next = checkPoints[i + 1]
    if (current.start) {
      openIntervals.push(current.id)
    } else {
      openIntervals = openIntervals.filter(ele => ele !== current.id)
    };

    if (current.value === next.value && current.id !== next.id) {
      continue
    };

    openIntervals.sort()
    let id = openIntervals.join('-')
    interval.push({id, value: [current.value, next.value]})
  };
  return interval
};


const computeOnLight = (rulesArr, limit = false) => {
  const checkOverlap = (x, y, z) => {
    for (let i = x.idArray.length - 1; i >= 0; i--) {
      let val = x.idArray[i];
      if (y.idHash[val] && z.idHash[val]) {
        return rulesArr[Number(val)].action === 'on'
      };
    };
    return false;
  };

  const makeIntHash = (intArr) => {
    intArr.forEach(ints => {
      let idHash = ints.id.split('-').reduce((acc, ele) => {
        acc[ele] = true
        return acc
      }, {})
      ints.idHash = idHash
    })
    return intArr
  };


  if (limit) {
    rulesArr = rulesArr.filter(ele => {
      return ele.vector.every(vec => {
        return (vec[0] > -50.5 && vec[1] > -50.5) && (vec[0] < 50.5 && vec[1] < 50.5)
      })
    })
    rulesArr = rulesArr.map(ele => {
      let result = {action: ele.action}
      result.vector = ele.vector.map(vec => {
        return vec.map(d1 => {
          let val1 = d1
          if (val1 < -50.5) val1 = -50.5
          if (val1 > 50.5) val1 = 50.5
          return val1 
        })
      })
      return result
    })
  }

  let xRules = rulesArr.map(ele => {
    return {action: ele.action, vector: ele.vector[0]}
  });
  let yRules = rulesArr.map(ele => {
    return {action: ele.action, vector: ele.vector[1]}
  });
  let zRules = rulesArr.map(ele => {
    return {action: ele.action, vector: ele.vector[2]}
  });
  let xInts = makeIntHash(buildIntervals(xRules, limit));
  xInts.forEach(xint => {
    xint.idArray = xint.id.split('-').sort((a, b) => Number(a) - Number(b))
  })
  let yInts = makeIntHash(buildIntervals(yRules, limit));
  let zInts = makeIntHash(buildIntervals(zRules, limit));


  let count = 0;

  xInts.forEach((x, idx) => {
    console.log(`${idx}/${xInts.length} x rules completed`)
    yInts.forEach(y => {
      zInts.forEach(z => {
        if (checkOverlap(x, y, z)) {
          // console.log(x, y, z, ((z.value[1] - z.value[0]) * (y.value[1] - y.value[0]) * (x.value[1] - x.value[0])))
          let val = ((z.value[1] - z.value[0]) * (y.value[1] - y.value[0]) * (x.value[1] - x.value[0]))
          count = count + val
        };
      });
    });
  });
  // }
  return count
};


module.exports = {
  parseRules,
  buildIntervals,
  computeOnLight,
};
