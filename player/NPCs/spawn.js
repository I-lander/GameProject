import { isPause, pauseDelta, monsters, tileSize, tileMap } from "../../app.js";
import { Monster } from "./monster.js";
import { mapSizeX, mapSizeY } from "../../level/map.js";
import { marginTop, marginLeft } from "../../UI/ScreenInit.js";
import { MONSTERS_LIST } from "../../core/constants.js";

const playerPos = {
  x: Math.floor(mapSizeX / 2),
  y: Math.floor(mapSizeY / 2),
};

let path = [];
let lastRiverSpawn = 0;
let spawnGroundRate = 0.2;
let spawnRiverRate = 0.5;

function getRiverLastTile() {
  path = [];
  const riverPath = getRiverPath(playerPos);
  return riverPath[riverPath.length - 1].position;
}

export { getRiverLastTile };

function spawnMonsters(timestamp) {
  if (isPause) {
    return;
  }

  for (let i = 0; i < tileMap.arrows.length; i++) {
    const arrow = tileMap.arrows[i];
    if (
      !isPause &&
      timestamp >= arrow.lastGroundSpawn + 1000 / spawnGroundRate + pauseDelta
    ) {
      const groundSpawnPosition = getGroundSpawnPosition(arrow);
      monsters.push(
        new Monster(
          groundSpawnPosition.x,
          groundSpawnPosition.y,
          "ground",
          tileSize,
          `./src/images/${
            MONSTERS_LIST[Math.floor(Math.random() * MONSTERS_LIST.length)]
          }.png`
        )
      );
      arrow.monstersCount++;
      arrow.lastGroundSpawn = timestamp;
    }
  }

  const riverPath = getRiverPath(playerPos);
  if (
    !isPause &&
    timestamp >= lastRiverSpawn + 1000 / spawnRiverRate &&
    riverPath.length > 5
  ) {
    const riverSpawnPosition = getRiverSpawnPosition(riverPath);
    monsters.push(
      new Monster(
        riverSpawnPosition.x,
        riverSpawnPosition.y,
        "river",
        tileSize,
        "./src/images/riverMonster.png"
      )
    );
    lastRiverSpawn = timestamp;
  }
  path = [];
  return;
}

function getGroundSpawnPosition(arrow) {
  let x = marginLeft;
  let y = marginTop;
  // if (Math.random() < 0.5) {
  //   x = Math.random() < 0.5 ? 0 - tileSize : mapSizeX * tileSize + tileSize;
  //   y = Math.random() * mapSizeY * tileSize + tileSize;
  // } else {
  //   x = Math.random() * mapSizeX * tileSize + tileSize;
  //   y = Math.random() < 0.5 ? 0 - tileSize : mapSizeY * tileSize + tileSize;
  // }
  const position = { x: arrow.x, y: arrow.y };
  return position;
}

function getRiverPath(position) {
  const neighbors = tileMap.getNeighbors(position);
  if (
    !path.some(
      (path) => path.position.x === position.x && path.position.y === position.y
    )
  ) {
    path.push({ position: position, direction: "START" });
  }

  if (
    neighbors[0].tileValue === "river" &&
    !path.some(
      (path) =>
        path.position.x === neighbors[0].position.x &&
        path.position.y === neighbors[0].position.y
    )
  ) {
    path.push({ position: neighbors[0].position, direction: "UP" });
    getRiverPath(neighbors[0].position);
  }

  if (
    neighbors[1].tileValue === "river" &&
    !path.some(
      (path) =>
        path.position.x === neighbors[1].position.x &&
        path.position.y === neighbors[1].position.y
    )
  ) {
    path.push({ position: neighbors[1].position, direction: "DOWN" });
    getRiverPath(neighbors[1].position);
  }
  if (
    neighbors[3].tileValue === "river" &&
    !path.some(
      (path) =>
        path.position.x === neighbors[3].position.x &&
        path.position.y === neighbors[3].position.y
    )
  ) {
    path.push({
      position: neighbors[3].position,
      direction: "RIGHT",
    });
    getRiverPath(neighbors[3].position);
  }
  if (
    neighbors[2].tileValue === "river" &&
    !path.some(
      (path) =>
        path.position.x === neighbors[2].position.x &&
        path.position.y === neighbors[2].position.y
    )
  ) {
    path.push({ position: neighbors[2].position, direction: "LEFT" });
    getRiverPath(neighbors[2].position);
  }

  return path;
}

function getRiverSpawnPosition(riverPath) {
  if (riverPath) {
    const position = riverPath[riverPath.length - 1].position;
    const spawnPosition = {
      x: position.x * tileSize,
      y: position.y * tileSize,
    };
    return spawnPosition;
  }
}

export { spawnMonsters };
