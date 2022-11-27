import { cleanMap, ctxScreen, inversePause, tileMap, updateSelectedBtn } from "../../app.js";
import { mapSizeX, mapSizeY } from "../../level/map.js";
import { possibilityForClick } from "../utils.js";

const CARD_FOR_LEVEL_UP = [
  class Spawn {
    title = "Spawn";
    description =
      "Add an arrow in a random position at any screen border.\n\nGain 10 soul ressources";
    function = () => {
      let x, y;
      if (Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 : mapSizeX - 1;
        y = Math.floor(Math.random() * mapSizeY);
      } else {
        x = Math.floor(Math.random() * mapSizeX);
        y = Math.random() < 0.5 ? 0 : mapSizeY - 1;
      }
      tileMap.map[y][x] = "arrows";
      tileMap.players[0].stats.manaRessource += 10;
    };
  },
  class PlaceSpawnPoint {
    title = "Spawn Point";
    description =
      "Place an spawn point anywhere in the screen border.\n\nGain 10 soul ressources";
    function = () => {
        cleanMap;
        updateSelectedBtn({ type: "arrows", value: -10 });
        possibilityForClick();
        tileMap.draw(ctxScreen);
        setTimeout(() => {
          inversePause();
        }, 100);
      tileMap.players[0].stats.manaRessource += 10;
    };
  },
  class GainRessources {
    title = "Gain";
    description = "Gain 100 soul ressources.\n\nLose 10 PV.";
    function = () => {
      tileMap.players[0].stats.manaRessource += 100;
      tileMap.players[0].stats.hp -= 10;
    };
  },
];

export { CARD_FOR_LEVEL_UP };
