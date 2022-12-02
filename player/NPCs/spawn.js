import {
  isPause,
  pauseDelta,
  monsters,
  tileSize,
  tileMap,
  inverseLeveUp,
} from "../../app.js";
import { Monster } from "./monster.js";
import { mapSizeX, mapSizeY } from "../../level/map.js";
import { marginTop, marginLeft } from "../../UI/ScreenInit.js";
import { MONSTERS_LIST } from "../../core/constants.js";
import { MONTERS_STATS } from "./monstersStats.js";

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
      if (monsters.length === 0) {
        setTimeout(() => {
          inverseLeveUp();
          tileMap.arrows.forEach((arrow) => {
            arrow.monstersCount = 0;
            arrow.MaxmonstersCount++;
          });
        }, 200);
      }
      return;
    }

    if (
      !isPause &&
      timestamp >=
        arrow.lastGroundSpawn + 1000 / spawnGroundRate + localPauseDelta
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
          // MONSTERS_LIST[Math.floor(Math.random() * MONSTERS_LIST.length)]
          // MONSTERS_LIST[0]
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

export { spawnMonsters };
