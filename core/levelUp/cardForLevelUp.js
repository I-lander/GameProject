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
    tile = "";
    bonus = "";
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
    tile = "";
    bonus = "";
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
    title = "Gain Ressources";
    tile = "";
    bonus = "up";
    description = "Gain 100 soul ressources.</br>Lose 10 PV.";
    function = () => {
      tileMap.players[0].stats.soulRessource += 100;
      tileMap.players[0].stats.hp -= 10;
    };
  },
  class GainLife {
    title = "Gain Life";
    tile = "health-cross";
    bonus = "up";
    description = "Gain 10 HP.</br>Lose 100 soul ressources .";
    function = () => {
      tileMap.players[0].stats.soulRessource -= 100;
      tileMap.players[0].stats.hp += 10;
    };
  },
  class TowerForceUpgrade {
    title = "Tower Force Upgrade";
    tile = "tower";
    bonus = "force-up";
    description = "All towers gain + 1 attack.";
    function = () => {
      update_tower_force(1);
    };
  },
  // class TowerForceDowngrade {
  //   title = "Tower Force Downgrade";
  //   tile = "tower";
  //   bonus = "force-down";
  //   description = "All towers lose 1 attack.</br>Minimum force : 1";
  //   function = () => {
  //     update_tower_force(-1);
  //   };
  // },
  class TowerSpeedUpgrade {
    title = "Tower Speed Upgrade";
    tile = "tower";
    bonus = "speed-up";
    description = `All towers gain + 1 speed.</br> Maximum speed :  5</br></br>Current speed : ${
      TOWER_ATTACK_RATE / 100
    }`;
    function = () => {
      TOWER_ATTACK_RATE < 500 ? update_tower_attack_rate(100) : null;
    };
  },
  // class TowerSpeedDowngrade {
  //   title = "Tower Speed Downgrade";
  //   tile = "tower";
  //   bonus = "speed-down";
  //   description = `Towers lose + 1 speed.</br> Minimum speed bonus : 0</br></br>Current speed : ${
  //     TOWER_ATTACK_RATE / 100
  //   }`;
  //   function = () => {
  //     TOWER_ATTACK_RATE > 0 ? update_tower_attack_rate(-100) : null;
  //   };
  // },
  class GodForceUpgrade {
    title = "God Force Upgrade";
    tile = "god-tile";
    bonus = "force-up";
    description = "God gains + 1 attack.";
    function = () => {
      update_god_force(1);
    };
  },
  // class GodForceDowngrade {
  //   title = "God Force Downgrade";
  //   tile = "god-tile";
  //   bonus = "force-down";
  //   description = "God lose 1 attack.</br>Minimum force : 1";
  //   function = () => {
  //     update_god_force(-1);
  //   };
  // },
  class GodSpeedUpgrade {
    title = "God Speed Upgrade";
    tile = "god-tile";
    bonus = "speed-up";
    description = `God gains + 1 speed.</br> Maximum speed bonus : 5</br></br>Current speed : ${
      GOD_ATTACK_RATE / 100
    }`;
    function = () => {
      GOD_ATTACK_RATE < 500 ? update_god_attack_rate(100) : null;
    };
  },
  // class GodSpeedDowngrade {
  //   title = "God Speed Downgrade";
  //   tile = "god-tile";
  //   bonus = "speed-down";
  //   description = `God lose + 1 speed.</br> Minimum speed bonus : 0</br></br>Current speed : ${
  //     GOD_ATTACK_RATE / 100
  //   }`;
  //   function = () => {
  //     GOD_ATTACK_RATE > 0 ? update_god_attack_rate(-100) : null;
  //   };
  // },
];

export { CARD_FOR_LEVEL_UP };
