const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

function buildGraph(edges) {
  const graph = Object.create(null);

  function addEdge(from, to) {
    if (graph[from] == null) graph[from] = [to];
    else graph[from].push(to);
  }

  for (let [from, to] of edges.map((edge) => edge.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }

  return graph;
}

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) return this;
    else {
      const parcels = this.parcels.filter(
        (parcel) => parcel.address !== destination
      );

      return new VillageState(destination, parcels);
    }
  }
}

const roadGraph = buildGraph(roads);
const first = new VillageState("Post Office", [
  { place: "Post Office", address: "Alice's House" },
  { place: "Post Office", address: "Daria's House" },
]);
const second = first.move("Alice's House");
const third = second.move("Alice's House");

/* console.log(roadGraph);
console.log(second);
console.log(third); */

function runRobot(state, robot, memory) {
  let turn = 0;

  while (true) {
    if (!state.parcels.length) {
      //console.log(`Done in ${turn} turns`);
      return turn;
    }

    const action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    turn++;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(arr) {
  const choice = Math.floor(Math.random() * arr.length);
  return arr[choice];
}

function randomRobot(state, memory) {
  return { direction: randomPick(roadGraph[state.place]) };
}

// Static method of VillageState class to create new instance of VillageState
VillageState.random = function (parcelCount = 5) {
  const parcels = [];

  for (let i = 0; i < parcelCount; i++) {
    const address = randomPick(Object.keys(roadGraph));
    let place;

    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place === address);

    parcels.push({ place, address });
  }

  return new VillageState("Post Office", parcels);
};

//runRobot(VillageState.random(), randomRobot);

const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office",
];

function routeRobot(state, memory) {
  if (!memory.length) memory = mailRoute;
  return { direction: memory[0], memory: memory.slice(1) };
}

//runRobot(VillageState.random(), routeRobot, mailRoute);

function findRoute(graph, from, to) {
  const visited = [{ at: from, route: [] }];

  for (let i = 0; i < visited.length; i++) {
    const { at, route } = visited[i];

    for (let place of graph[at]) {
      if (place === to) return route.concat(place);

      if (!visited.some((item) => item.at === place))
        visited.push({ at: place, route: route.concat(place) });
    }
  }
}

//console.log(findRoute(roadGraph, "Post Office", "Grete's House"));

function goalOrientedRobot({ place, parcels }, route) {
  if (!route.length) {
    const parcel = parcels[0];

    if (parcel.place == place) {
      route = findRoute(roadGraph, place, parcel.address);
    } else {
      route = findRoute(roadGraph, place, parcel.place);
    }
  }

  return { direction: route[0], memory: route.slice(1) };
}

//runRobot(VillageState.random(), goalOrientedRobot, []);

function compareRobots(robotFirst, memoryFirst, robotSecond, memorySecond) {
  const size = 100;
  let robotFirstTurns = 0;
  let robotSecondTurns = 0;

  for (let i = 0; i < size; i++) {
    const state = VillageState.random();
    robotFirstTurns += runRobot(state, robotFirst, memoryFirst);
    robotSecondTurns += runRobot(state, robotSecond, memorySecond);
  }

  console.log(robotFirstTurns / size, robotSecondTurns / size);
}

//compareRobots(routeRobot, mailRoute, goalOrientedRobot, []);

function lazyRobot({ place, parcels }, route) {
  if (!route.length) {
    const routes = parcels.map((parcel) => {
      if (parcel.place === place)
        return {
          route: findRoute(roadGraph, place, parcel.address),
          pickUp: false,
        };

      return {
        route: findRoute(roadGraph, place, parcel.place),
        pickUp: true,
      };
    });

    function score({ route, pickUp }) {
      return (pickUp ? 0.5 : 0) - route.length;
    }

    route = routes.reduce((a, b) => (score(a) > score(b) ? a : b)).route;
  }

  return { direction: route[0], memory: route.slice(1) };
}

// Not working
//runRobot(VillageState.random(), lazyRobot, []);
