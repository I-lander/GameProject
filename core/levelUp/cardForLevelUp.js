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
    id = "Spawn";
    tile = "tile-blank";
    bonus = "bonus-blank";
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
    id = "PlaceSpawnPoint";
    tile = "tile-blank";
    bonus = "bonus-blank";
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
    id = "GainRessources";
    tile = "tile-blank";
    bonus = "bonus-up";
    description = "Gain 100 soul ressources.</br>Lose 10 PV.";
    function = () => {
      tileMap.players[0].stats.soulRessource += 100;
      tileMap.players[0].stats.hp -= 10;
    };
  },
  class GainLife {
    id = "GainLife";
    tile = "health-cross";
    bonus = "bonus-up";
    description = "Gain 10 HP.</br>Lose 100 soul ressources .";
    function = () => {
      tileMap.players[0].stats.soulRessource -= 100;
      tileMap.players[0].stats.hp += 10;
    };
  },
  class TowerForceUpgrade {
    id = "TowerForceUpgrade";
    tile = "tower";
    bonus = "force-up";
    description = "All towers gain + 1 attack.";
    function = () => {
      update_tower_force(1);
    };
  },
  class TowerForceDowngrade {
    id = "TowerForceDowngrade";
    tile = "tower";
    bonus = "force-down";
    description = "All towers lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      update_tower_force(-1);
    };
  },
  class TowerSpeedUpgrade {
    id = "TowerSpeedUpgrade";
    tile = "tower";
    bonus = "cooldown-up";
    description = `All towers gain + 1 speed.</br> Maximum speed :  7 bonus</br></br>Current speed : ${
      TOWER_ATTACK_RATE / 100
    }`;
    function = () => {
      TOWER_ATTACK_RATE < 700 ? update_tower_attack_rate(100) : null;
    };
  },
  class TowerSpeedDowngrade {
    id = "TowerSpeedDowngrade";
    tile = "tower";
    bonus = "cooldown-down";
    description = `Towers lose + 1 speed.</br> Minimum speed bonus : -7</br></br>Current speed : ${
      TOWER_ATTACK_RATE / 100
    }`;
    function = () => {
      update_tower_attack_rate(-100);
    };
  },
  class GodForceUpgrade {
    id = "GodForceUpgrade";
    tile = "god-tile";
    bonus = "force-up";
    description = "God gains + 1 attack.";
    function = () => {
      update_god_force(1);
    };
  },
  class GodForceDowngrade {
    id = "GodForceDowngrade";
    tile = "god-tile";
    bonus = "force-down";
    description = "God lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      update_god_force(-1);
    };
  },
  class GodSpeedUpgrade {
    id = "GodSpeedUpgrade";
    tile = "god-tile";
    bonus = "cooldown-up";
    description = `God gains + 1 speed.</br> Maximum speed bonus : 7</br></br>Current speed : ${
      GOD_ATTACK_RATE / 100
    }`;
    function = () => {
      GOD_ATTACK_RATE < 700 ? update_god_attack_rate(100) : null;
    };
  },
  class GodSpeedDowngrade {
    id = "GodSpeedDowngrade";
    tile = "god-tile";
    bonus = "cooldown-down";
    description = `God lose + 1 speed.</br> Minimum speed bonus : -7</br></br>Current speed : ${
      GOD_ATTACK_RATE / 100
    }`;
    function = () => {
      update_god_attack_rate(-100);
    };
  },
];

export { CARD_FOR_LEVEL_UP };
