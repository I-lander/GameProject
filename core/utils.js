import { tileMap, tileSize, monsters, selectedBtn, ctxScreen, inversePause } from "../app.js";
import { mapSizeX, mapSizeY } from "../level/map.js";
import { getRiverLastTile } from "../player/NPCs/spawn.js";
import { SOLID_ELEMENTS } from "./constants.js";

function possibilityForClick() {
  let monsterTiles = [];

  for (let i = 0; i < monsters.length; i++) {
    const monsterPosition = tileMap.getPosition(monsters[i].x, monsters[i].y);
    if (tileMap.map[monsterPosition.y][monsterPosition.x] !== "0") {
      continue;
    }
    if (
      monsters[i].type === "ground"
      // tileMap.map[monsterPosition.y][monsterPosition.x] === 0
    ) {
      monsterTiles.push(monsterPosition);
    }
  }
  if (
    selectedBtn.type === "mountain" ||
    selectedBtn.type === "village" ||
    selectedBtn.type === "tower"
  ) {
    for (let row = 0; row < mapSizeY; row++) {
      for (let column = 0; column < mapSizeX; column++) {
        let tileCoordinate = {
          x: column,
          y: row,
          value: tileMap.map[row][column],
        };
        if (
          monsterTiles.some(
            (e) => e.x === tileCoordinate.x && e.y === tileCoordinate.y
          )
        ) {
          tileMap.map[row][column] = "monster";
        }
        let tile = tileMap.map[row][column];
        if (tile === "0") {
          tileMap.map[row][column] = "green";
        }
        if (
          monsterTiles.some(
            (e) => e.x === tileCoordinate.x && e.y === tileCoordinate.y
          )
        ) {
          tileMap.map[row][column] = "0";
        }
      }
    }
  }
  if (selectedBtn.type === "river") {
    const excludeValue = ["river", "1"];
    const riverLastTile = getRiverLastTile();
    let neighbors = tileMap.getNeighbors(riverLastTile);

    // UP
    if (
      neighbors[0].tileValue === "0" &&
      !excludeValue.some(
        (value) =>
          tileMap.getNeighbors(neighbors[0].position)[0].tileValue === value
      ) &&
      !excludeValue.some(
        (value) =>
          tileMap.getNeighbors(neighbors[0].position)[2].tileValue === value
      ) &&
      !excludeValue.some(
        (value) =>
          tileMap.getNeighbors(neighbors[0].position)[3].tileValue === value
      )
    ) {
      tileMap.map[neighbors[0].position.y][neighbors[0].position.x] = "green";
    }

    // DOWN
    if (
      neighbors[1].tileValue === "0" &&
      !excludeValue.some(
        (value) =>
          tileMap.getNeighbors(neighbors[1].position)[1].tileValue === value
      ) &&
      !excludeValue.some(
        (value) =>
          tileMap.getNeighbors(neighbors[1].position)[2].tileValue === value
      ) &&
      !excludeValue.some(
        (value) =>
          tileMap.getNeighbors(neighbors[1].position)[3].tileValue === value
      )
    ) {
      tileMap.map[neighbors[1].position.y][neighbors[1].position.x] = "green";
    }

    // LEFT
    if (
      neighbors[2].tileValue === "0" &&
      !excludeValue.some(
        (value) =>
          tileMap.getNeighbors(neighbors[2].position)[0].tileValue === value
      ) &&
      !excludeValue.some(
        (value) =>
          tileMap.getNeighbors(neighbors[2].position)[1].tileValue === value
      ) &&
      !excludeValue.some(
        (value) =>
          tileMap.getNeighbors(neighbors[2].position)[2].tileValue === value
      )
    ) {
      tileMap.map[neighbors[2].position.y][neighbors[2].position.x] = "green";
    }

    // RIGHT
    if (
      neighbors[3].tileValue === "0" &&
      !excludeValue.some(
        (value) =>
          tileMap.getNeighbors(neighbors[3].position)[0].tileValue === value
      ) &&
      !excludeValue.some(
        (value) =>
          tileMap.getNeighbors(neighbors[3].position)[1].tileValue === value
      ) &&
      !excludeValue.some(
        (value) =>
          tileMap.getNeighbors(neighbors[3].position)[3].tileValue === value
      )
    ) {
      tileMap.map[neighbors[3].position.y][neighbors[3].position.x] = "green";
    }
  }
  if (selectedBtn.type === "arrows") {
    for (let row = 0; row < mapSizeY; row++) {
      for (let column = 0; column < mapSizeX; column++) {
        let tile = tileMap.map[row][column];
        if (
          tile !== "arrows" &&
          tile !== "mountain" &&
          (row === 0 ||
            row === mapSizeY - 1 ||
            column === 0 ||
            column === mapSizeX - 1)
        ) {
          tileMap.map[row][column] = "green";
        }
      }
    }
  }
}

export { possibilityForClick };
