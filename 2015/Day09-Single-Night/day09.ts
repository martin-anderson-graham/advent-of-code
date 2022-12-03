type Route = {
  start: string;
  end: string;
  distance: number;
};
const parseInput = (str: string): Route[] => {
  return str.split("\n").map((r) => {
    let temp = r.split(" ");
    return {
      start: temp[0],
      end: temp[2],
      distance: Number(temp[4]),
    };
  });
};

const shortestRoute = (routes: Route[]): number => {
  const allCities = Array.from(
    new Set([...routes.map((r) => r.start), ...routes.map((r) => r.end)])
  );
  let minimum = Infinity;

  const buildRoutes = (visitedCities: string[], distance: number): number => {
    if (allCities.length === visitedCities.length) {
      if (distance < minimum) {
        minimum = distance;
      }
      return;
    }
    let citiesToVisit: string[] = allCities.filter((c) => {
      return !visitedCities.includes(c);
    });
    for (let i = 0; i < citiesToVisit.length; i++) {
      let city = citiesToVisit[i];
      let newVisitedCities = visitedCities.slice();
      newVisitedCities.push(city);
      if (newVisitedCities.length === 1) {
        buildRoutes(newVisitedCities, 0);
      } else {
        let newDistance = routes.find((c) => {
          return (
            (c.start === newVisitedCities[newVisitedCities.length - 2] &&
              c.end === city) ||
            (c.end === newVisitedCities[newVisitedCities.length - 2] &&
              c.start === city)
          );
        })?.distance;
        if (newDistance) {
          buildRoutes(newVisitedCities, distance + newDistance);
        }
      }
    }
  };
  buildRoutes([], 0);
  return minimum;
};

const longestRoute = (routes: Route[]): number => {
  const allCities = Array.from(
    new Set([...routes.map((r) => r.start), ...routes.map((r) => r.end)])
  );
  let maximum = -Infinity;

  const buildRoutes = (visitedCities: string[], distance: number): number => {
    if (allCities.length === visitedCities.length) {
      if (distance > maximum) {
        maximum = distance;
      }
      return;
    }
    let citiesToVisit: string[] = allCities.filter((c) => {
      return !visitedCities.includes(c);
    });
    for (let i = 0; i < citiesToVisit.length; i++) {
      let city = citiesToVisit[i];
      let newVisitedCities = visitedCities.slice();
      newVisitedCities.push(city);
      if (newVisitedCities.length === 1) {
        buildRoutes(newVisitedCities, 0);
      } else {
        let newDistance = routes.find((c) => {
          return (
            (c.start === newVisitedCities[newVisitedCities.length - 2] &&
              c.end === city) ||
            (c.end === newVisitedCities[newVisitedCities.length - 2] &&
              c.start === city)
          );
        })?.distance;
        if (newDistance) {
          buildRoutes(newVisitedCities, distance + newDistance);
        }
      }
    }
  };
  buildRoutes([], 0);
  return maximum;
};
export { parseInput, shortestRoute, longestRoute };
