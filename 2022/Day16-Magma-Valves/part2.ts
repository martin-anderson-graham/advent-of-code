import { preComputeMiniPaths, Rooms } from "./day16";

type Path = {
    roomsToVisit: string[];
    visitedRooms: Record<string, boolean>;
    visitedRoomsCount: number;
    total: number;
    time: number;
    yourRooms: string;
    eleRooms: string;
};

const scoreRoom = (time: number, rate: number): number => {
    return time * rate;
};

const scorePath = (
    path: Path,
    bestRoomPaths: Record<string, number>,
    rooms: Rooms
): number => {
    let yourRoom = "AA";
    let total = 0;
    let yourTime = path.time;
    for (let i = 2; i < path.yourRooms.length; i += 2) {
        let r = path.yourRooms.slice(i, i + 2);
        let distance = bestRoomPaths[`${yourRoom},${r}`];
        yourRoom = r;
        yourTime -= distance + 1;
        total += scoreRoom(yourTime, rooms[yourRoom].rate);
    }
    let eleRoom = "AA";
    let eleTime = path.time;
    for (let i = 2; i < path.eleRooms.length; i += 2) {
        let r = path.eleRooms.slice(i, i + 2);
        let distance = bestRoomPaths[`${eleRoom},${r}`];
        eleRoom = r;
        eleTime -= distance + 1;
        total += scoreRoom(eleTime, rooms[eleRoom].rate);
    }
    return total;
};

const part2 = (rooms: Rooms): number => {
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
        roomsToVisit: Array.from(roomsToVisit.keys()),
        visitedRooms: {},
        visitedRoomsCount: 0,
        total: 0,
        time: 26,
        yourRooms: "AA",
        eleRooms: "AA",
    };

    let roomsToVisitLength = path.roomsToVisit.length;
    const walk = (): void => {
        if (roomsToVisitLength === path.visitedRoomsCount) {
            let score = scorePath(path, bestRoomPaths, rooms);
            if (score > bestTotal) {
                bestTotal = score;
            }
            return;
        }
        for (let i = 0; i < path.roomsToVisit.length; i++) {
            let room = path.roomsToVisit[i];
            if (path.visitedRooms[room]) {
                continue;
            }
            path.visitedRoomsCount += 1;
            path.visitedRooms[room] = true;
            path.yourRooms += room;
            walk();
            path.yourRooms = path.yourRooms.slice(0, -2);

            path.eleRooms += room;
            walk();
            path.eleRooms = path.eleRooms.slice(0, -2);
            path.visitedRooms[room] = false;
            path.visitedRoomsCount -= 1;
        }
    };
    walk();
    // path.yourRooms = "AAJJBBCC";
    // path.eleRooms = "AADDHHEE";
    // bestTotal = scorePath(path, bestRoomPaths, rooms);
    return bestTotal;
};


export { part2  };
