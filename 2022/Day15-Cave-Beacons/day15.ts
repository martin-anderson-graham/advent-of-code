interface Pos {
  row: number;
  col: number;
}

interface Sensor extends Pos {
  distance: number;
  beacon: Pos;
}
interface Grid {
  minRow: number;
  maxRow: number;
  minCol: number;
  maxCol: number;
}
interface Input {
  sensors: Sensor[];
  grid: Grid;
  offSet: Pos;
}

const md = (r1: number, c1: number, r2: number, c2: number): number => {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
};

const parseInput = (str: string): Input => {
  let minRow = Infinity;
  let maxRow = -Infinity;
  let minCol = Infinity;
  let maxCol = -Infinity;

  let sensors: Sensor[] = str
    .split("\n")
    .map((row) => {
      let arr = row.replace(new RegExp("[:,xy=]", "g"), "").split(" ");
      let current: Sensor = {
        col: Number(arr[2]),
        row: Number(arr[3]),
        beacon: {
          col: Number(arr[8]),
          row: Number(arr[9]),
        },
        distance: md(
          Number(arr[8]),
          Number(arr[9]),
          Number(arr[2]),
          Number(arr[3])
        ),
      };
      if (current.row - current.distance < minRow) {
        minRow = current.row - current.distance;
      }
      if (current.row + current.distance > maxRow) {
        maxRow = current.row + current.distance;
      }
      if (current.col - current.distance < minCol) {
        minCol = current.col - current.distance;
      }
      if (current.col + current.distance > maxCol) {
        maxCol = current.col + current.distance;
      }
      return current;
    })
    .sort((a, b) => a.col - b.col);

  return {
    sensors,
    grid: {
      minRow,
      maxRow,
      minCol,
      maxCol,
    },
    offSet: {
      row: minRow,
      col: minCol,
    },
  };
};

const scoreRow = (grid: Grid, sensors: Sensor[], row: number): number => {
  const isPossible = (r: number, c: number): boolean => {
    let currentIdx = c;
    let scannerStartIdx = 0;
    while (scannerStartIdx < sensors.length) {
      let s = sensors[scannerStartIdx];
      let rowDiff = Math.abs(s.row - r);
      if (s.distance < rowDiff) {
        scannerStartIdx += 1;
        continue;
      }
      let minIdx = s.col - (s.distance - rowDiff);
      let maxIdx = s.col + (s.distance - rowDiff);
      if (minIdx <= currentIdx && maxIdx >= currentIdx) {
        return false;
      }
      scannerStartIdx += 1;
    }

    return true;
  };
  let count = 0;
  for (let c = grid.minCol; c < grid.maxCol; c++) {
    if (!isPossible(row, c)) {
      count += 1;
    }
  }
  return count - 1;
};

const findTuningFrequency = (sensors: Sensor[], bounds: number): number => {
  const isPossible = (r: number): number => {
    let currentIdx = 0;
    let scannerStartIdx = 0;
    while (currentIdx < bounds && scannerStartIdx < sensors.length) {
      let s = sensors[scannerStartIdx];
      let rowDiff = Math.abs(s.row - r);
      if (s.distance < rowDiff) {
        scannerStartIdx += 1;
        continue;
      }
      let minIdx = s.col - (s.distance - rowDiff);
      let maxIdx = s.col + (s.distance - rowDiff);
      if (minIdx <= currentIdx && maxIdx >= currentIdx) {
        currentIdx = maxIdx + 1;
      }
      scannerStartIdx += 1;
    }

    return currentIdx < bounds ? currentIdx : -1;
  };

  for (let r = 0; r <= bounds; r++) {
    let res = isPossible(r);
    if (res !== -1) {
      return 4000000 * res + r;
    }
  }
  return -1;
};
export { parseInput, scoreRow, findTuningFrequency };
