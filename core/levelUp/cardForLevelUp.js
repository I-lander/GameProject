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
    isBonus = true
    description =
      "Place an spawn point anywhere in the screen border.</br>Gain 3 soul resources.";
    function = () => {
      updateSelectedBtn({ type: "spawnPoints", value: 0 });
      possibilityForClick();
      tileMap.draw(ctxScreen);
      tileMap.players[0].draw(ctxScreen);
      inversePause();
      tileMap.players[0].stats.soulResource += 3;
    };
  },
  class GainResources {
    id = "GainResources";
    tile = "tile-blank";
    bonus = "bonus-up";
    isBonus = true
    description = "Gain 100 soul resources.</br>Lose 10 PV.";
    function = () => {
      tileMap.players[0].stats.soulResource += 100;
      tileMap.players[0].stats.hp -= 10;
    };
  },
  class GainLife {
    id = "GainLife";
    tile = "health-cross";
    bonus = "bonus-up";
    isBonus = true
    description = "Gain 10 HP.</br>Lose 100 soul resources .";
    function = () => {
      tileMap.players[0].stats.soulResource -= 100;
      tileMap.players[0].stats.hp += 10;
    };
  },
  class TowerForceUpgrade {
    id = "TowerForceUpgrade";
    tile = "tower";
    bonus = "force-up";
    isBonus = true
    description = "All towers gain + 1 attack.";
    function = () => {
      BONUS.TOWER_FORCE += 1;
    };
  },
  class TowerForceDowngrade {
    id = "TowerForceDowngrade";
    tile = "tower";
    bonus = "force-down";
    isBonus = false
    description = "All towers lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      BONUS.TOWER_FORCE -= 1;
      BONUS.TOWER_FORCE < -2 ? (BONUS.TOWER_FORCE = -2) : null;
    };
  },
  class GodForceUpgrade {
    id = "GodForceUpgrade";
    tile = "god-tile";
    bonus = "force-up";
    isBonus = true
    description = "God gains + 1 attack.";
    function = () => {
      BONUS.GOD_FORCE += 1;
    };
  },
  class GodForceDowngrade {
    id = "GodForceDowngrade";
    tile = "god-tile";
    bonus = "force-down";
    isBonus = false
    description = "God lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      BONUS.GOD_FORCE -= 1;
      BONUS.GOD_FORCE < -2 ? (BONUS.GOD_FORCE = -2) : null;
    };
  },
  class LavaForceUpgrade {
    id = "LavaForceUpgrade";
    tile = "lava";
    bonus = "force-up";
    isBonus = true
    description = `Lava gains + 1 attack.`;
    function = () => {
      BONUS.LAVA_FORCE += 1;
    };
  },
  class LavaForceDowngrade {
    id = "LavaForceDowngrade";
    tile = "lava";
    bonus = "force-down";
    isBonus = false
    description = "Lava lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      BONUS.LAVA_FORCE -= 1;
      BONUS.LAVA_FORCE < -2 ? (BONUS.LAVA_FORCE = -2) : null;
    };
  },
  class TowerSpeedUpgrade {
    id = "TowerSpeedUpgrade";
    tile = "tower";
    bonus = "cooldown-up";
    isBonus = true
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
    isBonus = false
    description = `Towers lose + 1 speed.</br> Minimum speed bonus : -7</br></br>Current speed : ${
      BONUS.TOWER_ATTACK_RATE / 100
    }`;
    function = () => {
      BONUS.TOWER_ATTACK_RATE -= 100;
      BONUS.TOWER_ATTACK_RATE < -700 ? (BONUS.TOWER_ATTACK_RATE = -700) : null;
    };
  },
  class GodSpeedUpgrade {
    id = "GodSpeedUpgrade";
    tile = "god-tile";
    bonus = "cooldown-up";
    isBonus = true
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
    isBonus = false
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
    isBonus = false
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
    isBonus = true
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
    isBonus = false
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
    isBonus = true
    description = `Tower range is expended.`;
    function = () => {
      BONUS.TOWER_RANGE += 0.5 * tileSize;
      BONUS.TOWER_RANGE > 2 * tileSize
        ? (BONUS.TOWER_RANGE = 2 * tileSize)
        : null;
    };
  },
  class StarRangeUpgrade {
    id = "StarRangeUpgrade";
    tile = "star";
    bonus = "range-up";
    isBonus = true
    description = `Star range is expended.`;
    function = () => {
      BONUS.STAR_RANGE += 0.5 * tileSize;
      BONUS.STAR_RANGE > 2 * tileSize
        ? (BONUS.STAR_RANGE = 2 * tileSize)
        : null;
    };
  },
  class StarRangeDowngrade {
    id = "StarRangeDowngrade";
    tile = "star";
    bonus = "range-down";
    isBonus = false
    description = `Star range is shortened.`;
    function = () => {
      BONUS.STAR_RANGE -= 0.5 * tileSize;
      BONUS.STAR_RANGE < -2 * tileSize
        ? (BONUS.STAR_RANGE = -2 * tileSize)
        : null;
    };
  },
];

export { CARD_FOR_LEVEL_UP };
