import { onGame, enemies, tileSize, tileMap } from "./app.js";
import { Enemy } from "./src/enemy.js";
import { map } from "./src/map.js";

const playerPos = {
  x: Math.floor(map.length / 2),
  y: Math.floor(map.length / 2),
};

let path = [];

function getRiverLastTile() {
  const riverPath = getRiverPath(playerPos);
  return riverPath[riverPath.length - 1].position;
}

export { getRiverLastTile };

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
    if (riverPath.length > 5) {
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
    path = [];
    return;
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
    neighbors[0].tileValue === "5" &&
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
    neighbors[1].tileValue === "5" &&
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
    neighbors[3].tileValue === "5" &&
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
    neighbors[2].tileValue === "5" &&
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

export { spawnEnemies };
