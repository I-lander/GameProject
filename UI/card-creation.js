import {
  inversePause,
  ctxScreen,
  tileMap,
  tileSize,
  isPause,
  cleanMap,
  updateSelectedBtn,
  pixelUnit,
} from "../app.js";
import { CARD_ELEMENTS } from "../core/constants.js";
import { possibilityForClick } from "../core/utils.js";
import { marginTop, marginLeft } from "./ScreenInit.js";

const buttons = [];

function drawMenu() {
  createButton("mountain");
  createButton("village");
  createButton("river");
  createButton("tower");
  createButton("thunder");
  for (let i = 0; i < 1; i++) {
    createButton("spider");
  }
  createButton("arrows");
}

function createButton(type) {
  const buttonSize = 64 * pixelUnit;
  const buttonContainer = document.getElementById("buttonContainer");
  let newButton = document.createElement("button");
  buttonContainer.appendChild(newButton);
  newButton.id = `${type + buttons.length}`;
  newButton.classList.add("buttonsTile");
  newButton.style.backgroundColor = "transparent";

  newButton.style.backgroundImage = `url(./src/images/card-${type}.png)`;
  if (type === "arrows" || type === "spider") {
    newButton.style.backgroundImage = `url(./src/images/${type}.png)`;
  }
  newButton.style.border = "none";
  newButton.style.left = `${
    marginLeft + canvasScreen.width + buttons.length * buttonSize
  }px`;
  newButton.style.top = `${marginTop + tileSize}px`;
  newButton.style.width = `${buttonSize}px`;
  newButton.style.height = `${buttonSize}px`;

  buttons.push(newButton);

  newButton.onclick = function () {
    const cardSelected = CARD_ELEMENTS.find((card) => {
      return card.type === type;
    });
    if (!isPause && cardSelected.value < tileMap.players[0].stats.soulRessource) {
      cleanMap();
      updateSelectedBtn({ type: cardSelected.type, value: cardSelected.value });
      possibilityForClick();
      tileMap.draw(ctxScreen);
      setTimeout(() => {
        inversePause();
      }, 100);
    }
  };
}

export { drawMenu, createButton };
