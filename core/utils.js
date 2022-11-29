import {
  tileMap,
  tileSize,
  monsters,
  selectedBtn,
  ctxScreen,
  inversePause,
} from "../app.js";
import { mapSizeX, mapSizeY } from "../level/map.js";
import { SOLID_ELEMENTS } from "./constants.js";

function possibilityForClick() {
  let monsterTiles = [];
  for (let i = 0; i < monsters.length; i++) {
    const monsterPosition = tileMap.getPosition(monsters[i].x, monsters[i].y);
    if (tileMap.map[monsterPosition.y][monsterPosition.x] !== "0") {
      continue;
    }
    if (
      monsters[i].stats.type === "ground"
      // tileMap.map[monsterPosition.y][monsterPosition.x] === 0
    ) {
      monsterTiles.push(monsterPosition);
    }
  }
  if (SOLID_ELEMENTS.includes(selectedBtn.type)) {
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
  if (selectedBtn.type === "arrows") {
    for (let row = 0; row < mapSizeY; row++) {
      for (let column = 0; column < mapSizeX; column++) {
        let tile = tileMap.map[row][column];
        if (
          tile !== "arrows" &&
          tile !== "mountain" &&
          tile !== "tower" &&
          tile !== "village" &&
          tile !== "star" &&
          tile !== "tree" &&
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
