import { Queue } from "./queue";

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

const preComputeMiniPaths = (
  roomsToVisit: Map<string, boolean>,
  rooms: Rooms
): Record<string, number> => {
  let result: Record<string, number> = {};

  let queue = new Queue();

  const findMinPath = (startRoom: string, endRoom: string): void => {
    queue.reset(startRoom, 0);
    let visited: Record<string, boolean> = {};
    visited[startRoom] = true;
    while (!queue.isEmpty()) {
      let current = queue.dequeue();
      if (current.name === endRoom) {
        result[`${startRoom},${endRoom}`] = current.value;
        result[`${endRoom},${startRoom}`] = current.value;
        return;
      } else {
        rooms[current.name].neighbors.forEach((n) => {
          if (!visited[n]) {
            visited[n] = true;
            queue.enqueue(n, current.value + 1);
          }
        });
      }
    }
  };

  roomsToVisit.forEach((_, key1) => {
    roomsToVisit.forEach((_, key2) => {
      if (key1 !== key2 && result[`${key1},${key2}`] === undefined) {
        findMinPath(key1, key2);
      }
    });
  });
  return result;
};

const findBestPath = (rooms: Rooms): number => {
  type Path = {
    roomsToVisit: Map<string, boolean>;
    total: number;
    time: number;
  };
  let bestTotal = 0;

  let roomsToVisit = new Map(
    Object.keys(rooms)
      .filter((r) => rooms[r].rate !== 0)
      .map((k) => {
        return [k, true];
      })
  );
  //need 'AA' to be in here even though its rate is zero
  roomsToVisit.set("AA", true);
  //keys are 'XX,YY', values are number of steps to get to target room
  let bestRoomPaths = preComputeMiniPaths(roomsToVisit, rooms);
  //now we delete it
  roomsToVisit.delete("AA");

  const path: Path = {
    roomsToVisit,
    total: 0,
    time: 30,
  };

  const walk = (currentRoomName: string): void => {
    //if we hit zero time we are done, or if there are no more rooms to open
    if (path.time <= 0 || path.roomsToVisit.size === 0) {
      if (path.total > bestTotal) {
        bestTotal = path.total;
      }
      return;
    }
    path.roomsToVisit.delete(currentRoomName);

    let toVisit = Array.from(path.roomsToVisit.keys());
    toVisit.forEach((r) => {
      path.time -= bestRoomPaths[`${currentRoomName},${r}`];
      //turn off the valve
      path.time -= 1;
      //add the total released pressure for that room
      let remainingTime = path.time >= 0 ? path.time : 0;
      path.total += rooms[r].rate * remainingTime;
      path.roomsToVisit.delete(r);
      walk(r);
      path.roomsToVisit.set(r, true);
      path.total -= rooms[r].rate * remainingTime;
      path.time += 1;
      path.time += bestRoomPaths[`${currentRoomName},${r}`];
    });
    path.roomsToVisit.set(currentRoomName, true);
  };

  walk("AA");
  return bestTotal;
};

const findBestPath2 = (rooms: Rooms): number => {
  type Path = {
    roomsToVisit: Map<string, boolean>;
    total: number;
    time: number;
    yourCurrentRoom: string;
    yourTargetRoom: string;
    yourTravelTime: number;
    eleCurrentRoom: string;
    eleTargetRoom: string;
    eleTravelTime: number;
  };
  let bestTotal = 0;
  let roomsToVisit = new Map(
    Object.keys(rooms)
      .filter((r) => rooms[r].rate !== 0)
      .map((k) => {
        return [k, true];
      })
  );
  //need 'AA' to be in here even though its rate is zero
  roomsToVisit.set("AA", true);
  //keys are 'XX,YY', values are number of steps to get to target room
  let bestRoomPaths = preComputeMiniPaths(roomsToVisit, rooms);
  //now we delete it
  roomsToVisit.delete("AA");
  /*
   * The plan:
   * pre-compute best paths between rooms
   * Backtrack to each node with a rate value not visited
   * look up the path from that room to target room
   * Walk that path, then generate the next ()
   *
   */
  const path: Path = {
    roomsToVisit,
    total: 0,
    time: 27,
    yourCurrentRoom: "AA",
    yourTargetRoom: "AA",
    yourTravelTime: 1,
    eleCurrentRoom: "AA",
    eleTargetRoom: "AA",
    eleTravelTime: 1,
  };

  const walk = (): void => {
    path.time -= 1;
    path.yourTravelTime -= 1;
    path.eleTravelTime -= 1;
    // console.log(
    //   path.yourTargetRoom,
    //   path.yourTravelTime,
    //   path.eleTargetRoom,
    //   path.eleTravelTime
    // );
    //if we hit zero time we are done, or if there are no more rooms to open
    if (
      path.time <= 0 ||
      (Number.isNaN(path.yourTravelTime) && Number.isNaN(path.eleTravelTime))
    ) {
      return;
    }

    //maybe if you both are stopped who gets the closer one?
    if (path.yourTravelTime === 0 && path.eleTravelTime === 0) {
      path.yourCurrentRoom = path.yourTargetRoom;
      path.eleCurrentRoom = path.eleTargetRoom;
      let yourBestRoom = "";
      let eleBestRoom = "";
      let bestVal = -Infinity;

      path.roomsToVisit.forEach((_, r) => {
        let yourTime =
          path.time - bestRoomPaths[`${path.yourCurrentRoom},${r}`] - 1;
        let yourVal = yourTime * rooms[r].rate;
        path.roomsToVisit.forEach((_, re) => {
          if (r === re) {
            return;
          }
          let eleTime =
            path.time - bestRoomPaths[`${path.eleCurrentRoom},${re}`] - 1;
          let eleVal = eleTime * rooms[re].rate;
          if (eleVal + yourVal > bestVal) {
            bestVal = eleVal + yourVal;
            yourBestRoom = r;
            eleBestRoom = re;
          }
        });
      });
      path.total += path.time * rooms[path.yourCurrentRoom].rate;
      path.roomsToVisit.delete(yourBestRoom);
      path.yourTargetRoom = yourBestRoom;
      path.yourTravelTime =
        bestRoomPaths[`${path.yourCurrentRoom},${path.yourTargetRoom}`] + 1;
    }

    //lets try being greedy - human
    if (path.yourTravelTime === 0) {
      path.yourCurrentRoom = path.yourTargetRoom;
      path.total += path.time * rooms[path.yourCurrentRoom].rate;
      let bestRoom = "";
      let bestVal = -Infinity;
      path.roomsToVisit.forEach((_, r) => {
        let remainingTimeAfterMoving =
          path.time - bestRoomPaths[`${path.yourCurrentRoom},${r}`] - 1;
        if (remainingTimeAfterMoving * rooms[r].rate > bestVal) {
          bestVal = remainingTimeAfterMoving * rooms[r].rate;
          bestRoom = r;
        }
      });
      path.roomsToVisit.delete(bestRoom);
      path.yourTargetRoom = bestRoom;
      path.yourTravelTime =
        bestRoomPaths[`${path.yourCurrentRoom},${path.yourTargetRoom}`] + 1;
    }

    //lets try being greedy - ele
    if (path.eleTravelTime === 0) {
      path.eleCurrentRoom = path.eleTargetRoom;
      path.total += path.time * rooms[path.eleCurrentRoom].rate;
      let bestRoom = "";
      let bestVal = -Infinity;
      path.roomsToVisit.forEach((_, r) => {
        let remainingTimeAfterMoving =
          path.time - bestRoomPaths[`${path.eleCurrentRoom},${r}`] - 1;
        if (remainingTimeAfterMoving * rooms[r].rate > bestVal) {
          bestVal = remainingTimeAfterMoving * rooms[r].rate;
          bestRoom = r;
        }
      });
      path.roomsToVisit.delete(bestRoom);
      path.eleTargetRoom = bestRoom;
      path.eleTravelTime =
        bestRoomPaths[`${path.eleCurrentRoom},${path.eleTargetRoom}`] + 1;
    }

    walk();
  };

  walk();
  return path.total;
};
export { parseInput, Rooms, findBestPath, preComputeMiniPaths, findBestPath2 };
