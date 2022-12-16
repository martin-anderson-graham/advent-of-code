type Room = {
  rate: number;
  neighbors: string[];
};

type Rooms = Record<string, Room>;

const parseInput = (str: string): Rooms => {
  return str.split("\n").reduce((res: Rooms, row) => {
    let arr = row.replace(new RegExp(";|,|rate=", "g"), "").split(" ");
    let name = arr[1];
    let rate = Number(arr[4]);
    let neighbors: string[] = [];
    for (let i = 9; i < arr.length; i++) {
      neighbors.push(arr[i]);
    }
    res[name] = {
      rate,
      neighbors,
    };
    return res;
  }, {});
};

type Path = {
  roomsToVisit: Map<string, boolean>;
  visitedRooms: Record<string, boolean>;
  total: number;
  time: number;
  pressureToAddEachMin: number;
};

const findBestPath = (rooms: Rooms): number => {
  let bestTotal = 0;

  let roomsToVisit = new Map(
    Object.keys(rooms).map((k) => {
      return [k, true];
    })
  );

  const path: Path = {
    roomsToVisit,
    visitedRooms: {},
    total: 0,
    time: 30,
    pressureToAddEachMin: 0,
  };

  const getMiniPath = (currentRoom: string, targetRoom: string): string[] => {
    return ["aa", "bb"];
  };

  const walk = (
    currentRoomName: string,
    miniPath: string[],
    pressure: number
  ): void => {
    if (path.roomsToVisit.size === 0) {
      pressure += (30 - path.time) * path.pressureToAddEachMin;
      if (pressure > bestTotal) {
        bestTotal = path.total;
      }
      return;
    }

    //generate the first set of targetRooms
    if (miniPath.length === 0) {
      path.time -= 1;
      let remainingRooms = path.roomsToVisit.keys();
      let nextRoomObj = remainingRooms.next();
      while (!nextRoomObj.done) {
        let miniPath = getMiniPath(currentRoomName, nextRoomObj.value);
        miniPath.forEach((room) => {
          walk(room, miniPath.slice(1), 0);
        });

        nextRoomObj = remainingRooms.next();
      }
    }
  };

  // walk("AA", 0);
  return bestTotal;
};

export { parseInput, findBestPath };
