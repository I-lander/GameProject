import { onGame, enemies, tileSize, tileMap } from "./app.js";
import { Enemy } from "./src/enemy.js";
import { map16x16 as map } from "./src/map.js";

const playerPos = {
  x: Math.floor(map.length / 2),
  y: Math.floor(map.length / 2),
};

let path = [];

function spawnEnemies() {
  if (onGame) {
    const groundSpawnPosition = getGroundSpawnPosition();
    enemies.push(
      new Enemy(
        groundSpawnPosition.x,
        groundSpawnPosition.y,
        "ground",
        tileSize,
        "./src/images/spider.png"
      )
    );

    const riverPath = getRiverPath(playerPos);
    const riverSpawnPosition = getRiverSpawnPosition(riverPath);
    enemies.push(
      new Enemy(
        riverSpawnPosition.x,
        riverSpawnPosition.y,
        "river",
        tileSize,
        "./src/images/spider.png"
      )
    );
  }
}

function getGroundSpawnPosition() {
  let x, y;
  if (Math.random() < 0.5) {
    x = Math.random() < 0.5 ? 0 - tileSize : canvasScreen.width + tileSize;
    y = Math.random() * canvasScreen.height;
  } else {
    x = Math.random() * canvasScreen.width;
    y = Math.random() < 0.5 ? 0 - tileSize : canvasScreen.height + tileSize;
  }
  const position = { x: x, y: y };
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
    neighbors.up.tileValue === "5" &&
    !path.some(
      (path) =>
        path.position.x === neighbors.up.position.x &&
        path.position.y === neighbors.up.position.y
    )
  ) {
    path.push({ position: neighbors.up.position, direction: "UP" });
    getRiverPath(neighbors.up.position);
  }

  if (
    neighbors.down.tileValue === "5" &&
    !path.some(
      (path) =>
        path.position.x === neighbors.down.position.x &&
        path.position.y === neighbors.down.position.y
    )
  ) {
    path.push({ position: neighbors.down.position, direction: "DOWN" });
    getRiverPath(neighbors.down.position);
  }
  if (
    neighbors.right.tileValue === "5" &&
    !path.some(
      (path) =>
        path.position.x === neighbors.right.position.x &&
        path.position.y === neighbors.right.position.y
    )
  ) {
    path.push({
      position: neighbors.right.position,
      direction: "RIGHT",
    });
    getRiverPath(neighbors.right.position);
  }
  if (
    neighbors.left.tileValue === "5" &&
    !path.some(
      (path) =>
        path.position.x === neighbors.left.position.x &&
        path.position.y === neighbors.left.position.y
    )
  ) {
    path.push({ position: neighbors.left.position, direction: "LEFT" });
    getRiverPath(neighbors.left.position);
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

export { spawnEnemies };
