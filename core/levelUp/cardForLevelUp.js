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

const CARD_FOR_LEVEL_UP = [
  class PlaceSpawnPoint {
    title = "Spawn Point";
    description =
      "Place an spawn point anywhere in the screen border.</br>Gain 3 soul ressources.";
    function = () => {
      updateSelectedBtn({ type: "arrows", value: 0 });
      possibilityForClick();
      tileMap.draw(ctxScreen);
      tileMap.players[0].draw(ctxScreen)
      inversePause();
      tileMap.players[0].stats.soulRessource += 3;
    };
  },
  class GainRessources {
    title = `Gain <span style=font-size:${24*pixelUnit}px>Ressources</span>`;
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
      for (let i = 0; i < tileMap.towers.length; i++) {
        const tower = tileMap.towers[i];
        tower.stats.force++;
      }
    };
  },
  class TowerSpeedUpgrade {
    title = "Tower Speed Upgrade";
    description = "All existing towers gain + 1 speed.</br> Maximum speed : 5";
    function = () => {
      for (let i = 0; i < tileMap.towers.length; i++) {
        const tower = tileMap.towers[i];
        tower.stats.attackRate < 500 ? (tower.stats.attackRate += 100) : null;
      }
    };
  },
  class GodForceUpgrade {
    title = "God Force Upgrade";
    description = "God gains + 1 attack.";
    function = () => {
      tileMap.players[0].stats.force++;
    };
  },
  class GodSpeedUpgrade {
    title = "God Speed Upgrade";
    description = "God gains + 1 speed.</br> Maximum speed : 5";
    function = () => {
      const god = tileMap.players[0];
      god.stats.attackRate < 500 ? (god.stats.attackRate += 100) : null;
    };
  },
];

export { CARD_FOR_LEVEL_UP };
