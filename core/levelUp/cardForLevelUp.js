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
    tile = "spawnTile";
    bonus = "bonusBlank";
    isBonus = true;
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
    tile = "tileBlank";
    bonus = "bonusUp";
    isBonus = true;
    description = "Gain 100 soul resources.</br>Lose 10 PV.";
    function = () => {
      tileMap.players[0].stats.soulResource += 100;
      tileMap.players[0].stats.hp -= 10;
    };
  },
  class GainLife {
    id = "GainLife";
    tile = "healthCross";
    bonus = "bonusUp";
    isBonus = true;
    description = "Gain 10 HP.</br>Lose 100 soul resources .";
    function = () => {
      tileMap.players[0].stats.soulResource -= 100;
      tileMap.players[0].stats.hp += 10;
    };
  },
  class TowerForceUpgrade {
    id = "TowerForceUpgrade";
    tile = "tower";
    bonus = "forceUp";
    isBonus = true;
    description = "All towers gain + 1 attack.";
    function = () => {
      BONUS.TOWER_FORCE += 1;
    };
  },
  class TowerForceDowngrade {
    id = "TowerForceDowngrade";
    tile = "tower";
    bonus = "forceDown";
    isBonus = false;
    description = "All towers lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      BONUS.TOWER_FORCE -= 1;
      BONUS.TOWER_FORCE < -2 ? (BONUS.TOWER_FORCE = -2) : null;
    };
  },
  class GodForceUpgrade {
    id = "GodForceUpgrade";
    tile = "godTile";
    bonus = "forceUp";
    isBonus = true;
    description = "God gains + 1 attack.";
    function = () => {
      BONUS.GOD_FORCE += 1;
    };
  },
  class GodForceDowngrade {
    id = "GodForceDowngrade";
    tile = "godTile";
    bonus = "forceDown";
    isBonus = false;
    description = "God lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      BONUS.GOD_FORCE -= 1;
      BONUS.GOD_FORCE < -2 ? (BONUS.GOD_FORCE = -2) : null;
    };
  },
  class LavaForceUpgrade {
    id = "LavaForceUpgrade";
    tile = "lava";
    bonus = "forceUp";
    isBonus = true;
    description = `Lava gains + 1 attack.`;
    function = () => {
      BONUS.LAVA_FORCE += 1;
    };
  },
  class LavaForceDowngrade {
    id = "LavaForceDowngrade";
    tile = "lava";
    bonus = "forceDown";
    isBonus = false;
    description = "Lava lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      BONUS.LAVA_FORCE -= 1;
      BONUS.LAVA_FORCE < -2 ? (BONUS.LAVA_FORCE = -2) : null;
    };
  },
  class TowerCooldownUpgrade {
    id = "TowerCooldownUpgrade";
    tile = "tower";
    bonus = "cooldownUp";
    isBonus = true;
    description = `Towers shoot cooldown is decreased of 0.1 sec.`;

    function = () => {
      BONUS.TOWER_COOLDOWN -= 100;
      BONUS.TOWER_COOLDOWN < -700 ? (BONUS.TOWER_COOLDOWN = -700) : null;
    };
  },
  class TowerCooldownDowngrade {
    id = "TowerCooldownDowngrade";
    tile = "tower";
    bonus = "cooldownDown";
    isBonus = false;
    description = `Towers shoot cooldown is increased of 0.1 sec.`;
    function = () => {
      BONUS.TOWER_COOLDOWN < 700 ? (BONUS.TOWER_COOLDOWN += 100) : null;
    };
  },
  class GodCooldownUpgrade {
    id = "GodCooldownUpgrade";
    tile = "godTile";
    bonus = "cooldownUp";
    isBonus = true;
    description = `God shoot cooldown is decreased of 0.1 sec.`;

    function = () => {
      BONUS.GOD_COOLDOWN -= 100;
      BONUS.GOD_COOLDOWN < -700 ? (BONUS.TOWER_COOLDOWN = -700) : null;
    };
  },
  class GodCooldownDowngrade {
    id = "GodCooldownDowngrade";
    tile = "godTile";
    bonus = "cooldownDown";
    isBonus = false;
    description = `God shoot cooldown is increased of 0.1 sec.`;
    function = () => {
      BONUS.GOD_COOLDOWN < 700 ? (BONUS.GOD_COOLDOWN += 100) : null;
    };
  },
  class GodRangeDowngrade {
    id = "GodRangeDowngrade";
    tile = "godTile";
    bonus = "rangeDown";
    isBonus = false;
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
    tile = "godTile";
    bonus = "rangeUp";
    isBonus = true;
    description = `God range is expended.`;
    function = () => {
      BONUS.GOD_RANGE += 0.5 * tileSize;
      BONUS.GOD_RANGE > 2 * tileSize ? (BONUS.GOD_RANGE = 2 * tileSize) : null;
    };
  },
  class TowerRangeDowngrade {
    id = "TowerRangeDowngrade";
    tile = "tower";
    bonus = "rangeDown";
    isBonus = false;
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
    bonus = "rangeUp";
    isBonus = true;
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
    bonus = "rangeUp";
    isBonus = true;
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
    bonus = "rangeDown";
    isBonus = false;
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
