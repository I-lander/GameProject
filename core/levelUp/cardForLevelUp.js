import {
  cleanMap,
  ctxScreen,
  inversePause,
  pixelUnit,
  tileMap,
  updateSelectedBtn,
} from "../../app.js";
import { mapSizeX, mapSizeY } from "../../level/map.js";
import { possibilityForClick } from "../utils.js";
import {
  GOD_ATTACK_RATE,
  TOWER_ATTACK_RATE,
  TOWER_FORCE,
  update_god_attack_rate,
  update_god_force,
  update_tower_attack_rate,
  update_tower_force,
} from "./bonus.js";

const CARD_FOR_LEVEL_UP = [
  class Spawn {
    title = "Spawn";
    description =
      "Add an arrow in a random position at any screen border.</br>Gain 10 soul ressources.";
    function = () => {
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
      tileMap.players[0].stats.manaRessource += 10;
    };
  },
  class PlaceSpawnPoint {
    title = "Spawn Point";
    description =
      "Place an spawn point anywhere in the screen border.</br>Gain 3 soul ressources.";
    function = () => {
      updateSelectedBtn({ type: "arrows", value: 0 });
      possibilityForClick();
      tileMap.draw(ctxScreen);
      tileMap.players[0].draw(ctxScreen);
      inversePause();
      tileMap.players[0].stats.soulRessource += 3;
    };
  },
  class GainRessources {
    title = `Gain <span style=font-size:${24 * pixelUnit}px>Ressources</span>`;
    description = "Gain 100 soul ressources.</br>Lose 10 PV.";
    function = () => {
      tileMap.players[0].stats.soulRessource += 100;
      tileMap.players[0].stats.hp -= 10;
    };
  },
  class GainLife {
    title = "Gain Life";
    description = "Gain 10 HP.</br>Lose 100 soul ressources .";
    function = () => {
      tileMap.players[0].stats.soulRessource -= 100;
      tileMap.players[0].stats.hp += 10;
    };
  },
  class TowerForceUpgrade {
    title = "Tower Force Upgrade";
    description = "All existing towers gain + 1 attack.";
    function = () => {
      update_tower_force(1);
      console.log(TOWER_FORCE);
    };
  },
  class TowerSpeedUpgrade {
    title = "Tower Speed Upgrade";
    description = "All existing towers gain + 1 speed.</br> Maximum speed : 5";
    function = () => {
      TOWER_ATTACK_RATE < 500 ? update_tower_attack_rate(100) : null;
    };
  },
  class GodForceUpgrade {
    title = "God Force Upgrade";
    description = "God gains + 1 attack.";
    function = () => {
      update_god_force(1);
    };
  },
  class GodSpeedUpgrade {
    title = "God Speed Upgrade";
    description = "God gains + 1 speed.</br> Maximum speed : 5";
    function = () => {
      GOD_ATTACK_RATE < 500 ? update_god_attack_rate(100) : null;
    };
  },
];

export { CARD_FOR_LEVEL_UP };
