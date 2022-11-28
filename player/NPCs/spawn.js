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

const playerPos = {
  x: Math.floor(mapSizeX / 2),
  y: Math.floor(mapSizeY / 2),
};

let path = [];
let spawnGroundRate = 0.2;

function spawnMonsters(timestamp) {
  if (isPause) {
    return;
  }

  for (let i = 0; i < tileMap.arrows.length; i++) {
    const arrow = tileMap.arrows[i];
    if (arrow.monstersCount === arrow.MaxmonstersCount) {
      if (monsters.length === 0) {
        tileMap.arrows.forEach((arrow) => {
          arrow.monstersCount = 0;
          arrow.MaxmonstersCount++;
        });
        setTimeout(()=>{inverseLeveUp();},500)
        
        tileMap.players[0].level++;
      }
      return;
    }
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

export { spawnMonsters };
