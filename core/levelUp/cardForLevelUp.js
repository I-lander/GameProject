import {
  cleanMap,
  ctxScreen,
  inversePause,
  pixelUnit,
  tileMap,
  tileSize,
  updateSelectedBtn,
} from "../../app.js";
import { mapSizeX, mapSizeY } from "../../level/map.js";
import { possibilityForClick } from "../utils.js";
import { BONUS } from "./bonus.js";

const CARD_FOR_LEVEL_UP = [
  class PlaceSpawnPoint {
    id = "PlaceSpawnPoint";
    tile = "spawn-tile";
    bonus = "bonus-blank";
    description =
      "Place an spawn point anywhere in the screen border.</br>Gain 3 soul ressources.";
    function = () => {
      updateSelectedBtn({ type: "spawnPoints", value: 0 });
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
      BONUS.TOWER_FORCE += 1;
    };
  },
  class TowerForceDowngrade {
    id = "TowerForceDowngrade";
    tile = "tower";
    bonus = "force-down";
    description = "All towers lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      BONUS.TOWER_FORCE -= 1;
      BONUS.TOWER_FORCE < -2 ? (BONUS.TOWER_FORCE = -2) : null;
    };
  },
  class TowerSpeedUpgrade {
    id = "TowerSpeedUpgrade";
    tile = "tower";
    bonus = "cooldown-up";
    description = `All towers gain + 1 speed.</br> Maximum speed :  7 bonus</br></br>Current speed : ${
      BONUS.TOWER_ATTACK_RATE / 100
    }`;
    function = () => {
      BONUS.TOWER_ATTACK_RATE < 700 ? (BONUS.TOWER_ATTACK_RATE += 100) : null;
    };
  },
  class TowerSpeedDowngrade {
    id = "TowerSpeedDowngrade";
    tile = "tower";
    bonus = "cooldown-down";
    description = `Towers lose + 1 speed.</br> Minimum speed bonus : -7</br></br>Current speed : ${
      BONUS.TOWER_ATTACK_RATE / 100
    }`;
    function = () => {
      BONUS.TOWER_ATTACK_RATE -= 100;
      BONUS.TOWER_ATTACK_RATE < -700 ? (BONUS.TOWER_ATTACK_RATE = -700) : null;
    };
  },
  class GodForceUpgrade {
    id = "GodForceUpgrade";
    tile = "god-tile";
    bonus = "force-up";
    description = "God gains + 1 attack.";
    function = () => {
      BONUS.GOD_FORCE += 1;
    };
  },
  class GodForceDowngrade {
    id = "GodForceDowngrade";
    tile = "god-tile";
    bonus = "force-down";
    description = "God lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      BONUS.GOD_FORCE -= 1;
      BONUS.GOD_FORCE < -2 ? (BONUS.GOD_FORCE = -2) : null;
    };
  },
  class GodSpeedUpgrade {
    id = "GodSpeedUpgrade";
    tile = "god-tile";
    bonus = "cooldown-up";
    description = `God gains + 1 speed.</br> Maximum speed bonus : 7</br></br>Current speed : ${
      BONUS.GOD_ATTACK_RATE / 100
    }`;
    function = () => {
      BONUS.GOD_ATTACK_RATE < 700 ? (BONUS.TOWER_ATTACK_RATE += 100) : null;
    };
  },
  class GodSpeedDowngrade {
    id = "GodSpeedDowngrade";
    tile = "god-tile";
    bonus = "cooldown-down";
    description = `God lose + 1 speed.</br> Minimum speed bonus : -7</br></br>Current speed : ${
      BONUS.GOD_ATTACK_RATE / 100
    }`;
    function = () => {
      BONUS.GOD_ATTACK_RATE -= 100;
      BONUS.GOD_ATTACK_RATE < -700 ? (BONUS.TOWER_ATTACK_RATE = -700) : null;
    };
  },
  class GodRangeDowngrade {
    id = "GodRangeDowngrade";
    tile = "god-tile";
    bonus = "range-down";
    description = `God range is shortened.`;
    function = () => {
      BONUS.GOD_RANGE -= 0.5 * tileSize;
      BONUS.GOD_RANGE < -2 * tileSize
        ? (BONUS.GOD_RANGE = -2 * tileSize)
        : null;
    };
  },
  class GodRangeUpgrade {
    id = "GodRangeUpgrade";
    tile = "god-tile";
    bonus = "range-up";
    description = `God range is expended.`;
    function = () => {
      BONUS.GOD_RANGE += 0.5 * tileSize;
      BONUS.GOD_RANGE > 2 * tileSize ? (BONUS.GOD_RANGE = 2 * tileSize) : null;
    };
  },
  class TowerRangeDowngrade {
    id = "TowerRangeDowngrade";
    tile = "tower";
    bonus = "range-down";
    description = `Tower range is shortened.`;
    function = () => {
      BONUS.TOWER_RANGE -= 0.5 * tileSize;
      BONUS.TOWER_RANGE < -2 * tileSize
        ? (BONUS.TOWER_RANGE = -2 * tileSize)
        : null;
    };
  },
  class TowerRangeUpgrade {
    id = "TowerRangeUpgrade";
    tile = "tower";
    bonus = "range-up";
    description = `Tower range is expended.`;
    function = () => {
      BONUS.TOWER_RANGE += 0.5 * tileSize;
      BONUS.TOWER_RANGE > 2 * tileSize
        ? (BONUS.TOWER_RANGE = 2 * tileSize)
        : null;
    };
  },
  class LavaForceUpgrade {
    id = "LavaForceUpgrade";
    tile = "lava";
    bonus = "force-up";
    description = `Lava gains + 1 attack.`;
    function = () => {
      BONUS.LAVA_FORCE += 1
    };
  },
  class LavaForceDowngrade {
    id = "LavaForceDowngrade";
    tile = "lava";
    bonus = "force-down";
    description = "Lava lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      BONUS.LAVA_FORCE -= 1;
      BONUS.LAVA_FORCE < -2 ? (BONUS.LAVA_FORCE = -2) : null;
    };
  },
];

export { CARD_FOR_LEVEL_UP };
