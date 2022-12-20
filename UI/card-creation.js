import {
  inversePause,
  ctxScreen,
  tileMap,
  tileSize,
  isPause,
  cleanMap,
  updateSelectedBtn,
  pixelUnit,
  selectedBtn,
  updatePause,
} from "../app.js";
import { CARD_ELEMENTS, SOLID_ELEMENTS } from "../core/constants/tiles.js";
import { possibilityForClick, renderScreenOnce } from "../core/utils.js";
import { updateStatusText } from "./actionButtons.js";
import { renderCardDescription } from "./card-description.js";

export const cardButtons = [];
const maxCardPerLign = 5;
let line = 0;

const cardDeck = [
  "mountain",
  "village",
  "tree",
  "tower",
  "desert",
  "lava",
  "river",
  "star",
  "bomb",
  "thunder",
];

function drawCards() {
  for (let card = 0; card < cardDeck.length; card++) {
    createCard(cardDeck[card]);
  }
}
function createCard(type) {
  const cardSelected = CARD_ELEMENTS.find((card) => {
    return card.type === type;
  });
  const buttonSize = 64 * pixelUnit;
  const buttonContainer = document.getElementById("buttonContainer");
  buttonContainer.style.height = `${buttonSize * 2}px`;
  let Xpos = (cardButtons.length % maxCardPerLign) * buttonSize;
  line = (cardButtons.length % maxCardPerLign) * buttonSize ? line : line + 1;
  let Ypos = buttonSize * (line - 1);

  let newButton = document.createElement("button");
  buttonContainer.appendChild(newButton);
  newButton.id = `${type + cardButtons.length}`;
  newButton.classList.add("buttonsTile");
  newButton.style.position = "absolute";
  newButton.style.left = `${Xpos}px`;
  newButton.style.top = `${Ypos}px`;

  const btnImage = new Image();
  btnImage.src = `./src/images/${type}.png`;
  newButton.appendChild(btnImage);
  btnImage.style.position = "absolute";
  btnImage.style.width = `${32 * pixelUnit}px`;
  btnImage.style.height = `${32 * pixelUnit}px`;
  btnImage.style.left = `${16 * pixelUnit}px`;
  btnImage.style.top = `${16 * pixelUnit}px`;

  newButton.style.backgroundColor = "transparent";
  newButton.style.border = "none";
  newButton.style.width = `${buttonSize}px`;
  newButton.style.height = `${buttonSize}px`;

  let cardValueText = document.createElement("p");
  buttonContainer.appendChild(cardValueText);

  cardValueText.innerText = `${cardSelected.value}`;
  cardValueText.style.position = "absolute";
  cardValueText.style.left = `${Xpos}px`;
  cardValueText.style.top = `${Ypos + 7 * pixelUnit}px`;
  cardValueText.style.width = `${buttonSize}px`;
  cardValueText.style.textAlign = "center";
  cardValueText.style.fontSize = `${5 * pixelUnit}px`;
  cardValueText.style.userSelect = "none";
  cardValueText.style.fontWeight = "bold";

  let cardTitleText = document.createElement("p");
  buttonContainer.appendChild(cardTitleText);

  cardTitleText.innerText = `${cardSelected.title}`;
  cardTitleText.style.position = "absolute";
  cardTitleText.style.left = `${Xpos + 16 * pixelUnit}px`;
  cardTitleText.style.top = `${Ypos + 54 * pixelUnit}px`;
  cardTitleText.style.width = `${32 * pixelUnit}px`;
  cardTitleText.style.height = `${10 * pixelUnit}px`;
  cardTitleText.style.textAlign = "center";
  cardTitleText.style.verticalAlign = "middle";
  cardTitleText.style.fontSize = `${4 * pixelUnit}px`;
  cardTitleText.style.display = "table-cell";
  cardTitleText.style.userSelect = "none";
  cardTitleText.style.fontWeight = "bold";

  cardButtons.push(newButton);

  newButton.onclick = function () {
    const closeBtn = document.getElementById("closeButton");
    if (selectedBtn && selectedBtn.type === "spawnPoints") {
      return;
    }
    for (let button of cardButtons) {
      button.disabled === true ? (button.disabled = false) : null;
    }

    updateSelectedBtn({ type: cardSelected.type, value: cardSelected.value });
    renderCardDescription({
      type: cardSelected.type,
      value: cardSelected.value,
    });
    renderScreenOnce();
    updatePause(true);
    updateStatusText(pixelUnit);
    createCloseButton(newButton);
    newButton.disabled = true;
    closeBtn ? closeBtn.remove() : null;
  };
}

function createCloseButton(newButton) {
  const closeButtonSize = 32 * pixelUnit;

  let closeButton = document.createElement("button");
  newButton.appendChild(closeButton);
  closeButton.id = "closeButton";
  closeButton.classList.add("buttonsTile");
  closeButton.style.position = "absolute";
  closeButton.style.left = `${16 * pixelUnit}px`;
  closeButton.style.top = `${16 * pixelUnit}px`;
  closeButton.style.backgroundColor = "rgba(50,50,50,0.6)";
  closeButton.style.backgroundImage = `url(./src/images/closeButton.png)`;
  closeButton.style.border = "none";

  closeButton.style.width = `${closeButtonSize}px`;
  closeButton.style.height = `${closeButtonSize}px`;
  closeButton.onclick = function () {
    updateSelectedBtn(undefined);
    renderCardDescription(undefined);
    closeButton.remove();
    cleanMap();
    setTimeout(() => {
      updatePause(false);
      for (let button of cardButtons) {
        button.disabled === true ? (button.disabled = false) : null;
      }
    }, 100);
  };
}

export { drawCards, createCard };
