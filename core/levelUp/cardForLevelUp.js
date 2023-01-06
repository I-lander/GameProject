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
    bonusType = "other";
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
    bonus = "bonus";
    bonusType = "bonus";
    description = "Gain 100 soul resources.";
    function = () => {
      tileMap.players[0].stats.soulResource += 100;
    };
  },
  class GainLife {
    id = "GainLife";
    tile = "healthCross";
    bonus = "bonus";
    bonusType = "bonus";
    description = "Gain 10 HP.";
    function = () => {
      tileMap.players[0].stats.hp += 10;
    };
  },
  class TowerForceUpgrade {
    id = "TowerForceUpgrade";
    tile = "tower";
    bonus = "force";
    bonusType = "bonus";
    description = "All towers gain + 1 attack.";
    function = () => {
      BONUS.TOWER_FORCE += 1;
    };
  },
  class TowerForceDowngrade {
    id = "TowerForceDowngrade";
    tile = "tower";
    bonus = "force";
    bonusType = "penalty";
    description = "All towers lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      BONUS.TOWER_FORCE -= 1;
      BONUS.TOWER_FORCE < -2 ? (BONUS.TOWER_FORCE = -2) : null;
    };
  },
  class GodForceUpgrade {
    id = "GodForceUpgrade";
    tile = "godTile";
    bonus = "force";
    bonusType = "bonus";
    description = "God gains + 1 attack.";
    function = () => {
      BONUS.GOD_FORCE += 1;
    };
  },
  class GodForceDowngrade {
    id = "GodForceDowngrade";
    tile = "godTile";
    bonus = "force";
    bonusType = "penalty";
    description = "God lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      BONUS.GOD_FORCE -= 1;
      BONUS.GOD_FORCE < -2 ? (BONUS.GOD_FORCE = -2) : null;
    };
  },
  class LavaForceUpgrade {
    id = "LavaForceUpgrade";
    tile = "lava";
    bonus = "force";
    bonusType = "bonus";
    description = `Lava gains + 1 attack.`;
    function = () => {
      BONUS.LAVA_FORCE += 1;
    };
  },
  class LavaForceDowngrade {
    id = "LavaForceDowngrade";
    tile = "lava";
    bonus = "force";
    bonusType = "penalty";
    description = "Lava lose 1 attack.</br>Minimum force bonus : -2";
    function = () => {
      BONUS.LAVA_FORCE -= 1;
      BONUS.LAVA_FORCE < -2 ? (BONUS.LAVA_FORCE = -2) : null;
    };
  },
  class TowerCooldownUpgrade {
    id = "TowerCooldownUpgrade";
    tile = "tower";
    bonus = "cooldown";
    bonusType = "bonus";
    description = `Towers shoot cooldown is decreased of 0.1 sec.`;

    function = () => {
      BONUS.TOWER_COOLDOWN -= 100;
      BONUS.TOWER_COOLDOWN < -700 ? (BONUS.TOWER_COOLDOWN = -700) : null;
    };
  },
  class TowerCooldownDowngrade {
    id = "TowerCooldownDowngrade";
    tile = "tower";
    bonus = "cooldown";
    bonusType = "penalty";
    description = `Towers shoot cooldown is increased of 0.1 sec.`;
    function = () => {
      BONUS.TOWER_COOLDOWN < 700 ? (BONUS.TOWER_COOLDOWN += 100) : null;
    };
  },
  class GodCooldownUpgrade {
    id = "GodCooldownUpgrade";
    tile = "godTile";
    bonus = "cooldown";
    bonusType = "bonus";
    description = `God shoot cooldown is decreased of 0.1 sec.`;

    function = () => {
      BONUS.GOD_COOLDOWN -= 100;
      BONUS.GOD_COOLDOWN < -700 ? (BONUS.TOWER_COOLDOWN = -700) : null;
    };
  },
  class GodCooldownDowngrade {
    id = "GodCooldownDowngrade";
    tile = "godTile";
    bonus = "cooldown";
    bonusType = "penalty";
    description = `God shoot cooldown is increased of 0.1 sec.`;
    function = () => {
      BONUS.GOD_COOLDOWN < 700 ? (BONUS.GOD_COOLDOWN += 100) : null;
    };
  },
  class GodRangeDowngrade {
    id = "GodRangeDowngrade";
    tile = "godTile";
    bonus = "range";
    bonusType = "penalty";
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
    bonus = "range";
    bonusType = "bonus";
    description = `God range is expended.`;
    function = () => {
      BONUS.GOD_RANGE += 0.5 * tileSize;
      BONUS.GOD_RANGE > 2 * tileSize ? (BONUS.GOD_RANGE = 2 * tileSize) : null;
    };
  },
  class TowerRangeDowngrade {
    id = "TowerRangeDowngrade";
    tile = "tower";
    bonus = "range";
    bonusType = "penalty";
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
    bonus = "range";
    bonusType = "bonus";
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
    bonus = "range";
    bonusType = "bonus";
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
    bonus = "range";
    bonusType = "penalty";
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
