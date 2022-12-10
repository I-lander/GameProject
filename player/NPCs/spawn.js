import {
  isPause,
  pauseDelta,
  monsters,
  tileSize,
  tileMap,
  inverseLeveUp,
  particles,
} from "../../app.js";
import { Monster } from "./monster.js";
import { mapSizeX, mapSizeY } from "../../level/map.js";
import { marginTop, marginLeft } from "../../UI/ScreenInit.js";
import { MONTERS_STATS } from "../../core/constants/monsters.js";
import { calculateInterval } from "../../core/utils.js";

const playerPos = {
  x: Math.floor(mapSizeX / 2),
  y: Math.floor(mapSizeY / 2),
};

let path = [];
let spawnGroundRate = 0.2;

let localPauseDelta = 0;

function monsterSelection() {
  const array = MONTERS_STATS.filter((monster) => {
    return monster.level <= tileMap.players[0].level;
  });
  return array;
}
function spawnMonsters() {
  const timestamp = Date.now();

  if (pauseDelta > 0) {
    localPauseDelta = pauseDelta;
  }
  for (let i = 0; i < tileMap.arrows.length; i++) {
    const arrow = tileMap.arrows[i];
    if (arrow.monstersCount === arrow.MaxmonstersCount) {
      if (monsters.length === 0 && particles.length === 0) {
        inverseLeveUp();
        tileMap.arrows.forEach((arrow) => {
          arrow.monstersCount = 0;
          arrow.MaxmonstersCount++;
        });
      }
      return;
    }

    if (
      !isPause &&
      calculateInterval(
        timestamp,
        arrow.lastGroundSpawn,
        1000 / spawnGroundRate,
        localPauseDelta
      )
    ) {
      const monsterSelectionArray = monsterSelection();
      const monsterSelected =
        monsterSelectionArray[
          Math.floor(Math.random() * monsterSelectionArray.length)
        ];
      const groundSpawnPosition = getGroundSpawnPosition(arrow);
      monsters.push(
        new Monster(
          groundSpawnPosition.x,
          groundSpawnPosition.y,
          tileSize,
          monsterSelected.name,
          monsterSelected.type
        )
      );
      arrow.monstersCount++;
      arrow.lastGroundSpawn = timestamp;

      localPauseDelta = 0;
    }
  }

  path = [];
  return;
}

export function getGroundSpawnPosition(arrow) {
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

export function generateSpawn() {
  let x, y;
  if (Math.random() < 0.5) {
    x = Math.random() < 0.5 ? 0 : mapSizeX - 1;
    y = Math.floor(Math.random() * mapSizeY);
  } else {
    x = Math.floor(Math.random() * mapSizeX);
    y = Math.random() < 0.5 ? 0 : mapSizeY - 1;
  }
  while (
    tileMap.arrows.some(
      (arrow) => arrow.position.x === x && arrow.position.y === y
    )
  ) {
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 : mapSizeX - 1;
      y = Math.floor(Math.random() * mapSizeY);
    } else {
      x = Math.floor(Math.random() * mapSizeX);
      y = Math.random() < 0.5 ? 0 : mapSizeY - 1;
    }
  }
  tileMap.map[y][x] = "arrows";
  tileMap.players[0].stats.soulRessource += 10;
}

export { spawnMonsters };
