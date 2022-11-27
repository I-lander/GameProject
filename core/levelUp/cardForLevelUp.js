import { inversePause } from "../../app.js";

const CARD_FOR_LEVEL_UP = [
  class Spawn {
    title = "Spawn";
    description =
      "Add an arrow in a random position at any screen border. Gain 10 soul ressources";
    function = () => {
      console.log("x");
    };
  },
  class GainRessources {
    title = "Gain";
    description = "Gain 100 soul ressources.";
    function = () => {
      console.log("y");
    };
  },
];

export { CARD_FOR_LEVEL_UP };
