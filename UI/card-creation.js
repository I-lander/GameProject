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
const maxCardPerLign = 5;

const cardDeck = [
  "mountain",
  "village",
  "river",
  "tower",
  "thunder",
  "desert",
  "lava",
  "tree",
  "bomb",
  "arrows",
  // "spider",
];

function drawCards() {
  for (let card = 0; card < cardDeck.length; card++) {
    createCard(cardDeck[card]);
  }
}

function createCard(type) {
  const buttonSize = 64 * pixelUnit;
  const buttonContainer = document.getElementById("buttonContainer");
  buttonContainer.style.height = `${buttonSize * 2}px`;
  let Xpos = buttons.length * buttonSize;
  let Ypos = 0;
  if (Xpos > buttonSize * (maxCardPerLign - 1)) {
    Ypos = buttonSize;
    Xpos = (buttons.length - maxCardPerLign) * buttonSize;
  }
  let newButton = document.createElement("button");
  buttonContainer.appendChild(newButton);
  newButton.id = `${type + buttons.length}`;
  newButton.classList.add("buttonsTile");
  newButton.style.position = "absolute";
  newButton.style.left = `${Xpos}px`;
  newButton.style.top = `${Ypos}px`;

  newButton.style.backgroundColor = "transparent";
  newButton.style.backgroundImage = `url(./src/images/card-${type}.png)`;
  newButton.style.border = "none";
  newButton.style.width = `${buttonSize}px`;
  newButton.style.height = `${buttonSize}px`;

  buttons.push(newButton);

  newButton.onclick = function () {
    const cardSelected = CARD_ELEMENTS.find((card) => {
      return card.type === type;
    });
    if (
      !isPause &&
      cardSelected.value <= tileMap.players[0].stats.manaRessource &&
      tileMap.players[0].stats.manaRessource >= 0
    ) {
      cleanMap();
      updateSelectedBtn({ type: cardSelected.type, value: cardSelected.value });
      possibilityForClick();
      tileMap.draw(ctxScreen);
      setTimeout(() => {
        inversePause();
      }, 100);
      createCloseButton(newButton);
    }
  };
}

function createCloseButton(newButton) {
  const closeButtonSize = 32 * pixelUnit;

  let closeButton = document.createElement("button");
  newButton.appendChild(closeButton);
  closeButton.id = "closeButton";
  closeButton.classList.add("buttonsTile");
  closeButton.style.backgroundColor = "rgba(50,50,50,0.6)";
  closeButton.style.backgroundImage = `url(./src/images/closeButton.png)`;
  closeButton.style.border = "none";

  closeButton.style.width = `${closeButtonSize}px`;
  closeButton.style.height = `${closeButtonSize}px`;
  closeButton.onclick = function () {
    updateSelectedBtn({ type: undefined, value: undefined });
    closeButton.remove();
    cleanMap();
    setTimeout(() => {
      inversePause();
    }, 100);
  };
}

export { drawCards, createCard };
