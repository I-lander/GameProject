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
} from "../app.js";
import { CARD_ELEMENTS } from "../core/constants/tiles.js";
import { possibilityForClick } from "../core/utils.js";
import { updateStatusText } from "./actionButtons.js";
import { renderCardDescription } from "./card-description.js";

const buttons = [];
const maxCardPerLign = 5;
let line = 0;

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
  "star",
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
  let Xpos = (buttons.length % maxCardPerLign) * buttonSize;
  line = (buttons.length % maxCardPerLign) * buttonSize ? line : line + 1;
  let Ypos = buttonSize * (line - 1);

  let newButton = document.createElement("button");
  buttonContainer.appendChild(newButton);
  newButton.id = `${type}`;
  newButton.classList.add("buttonsTile");
  newButton.style.position = "absolute";
  newButton.style.left = `${Xpos}px`;
  newButton.style.top = `${Ypos}px`;

  newButton.style.backgroundColor = "transparent";
  newButton.style.backgroundImage = `url(./src/images/card-${type}.png)`;
  newButton.style.border = "none";
  newButton.style.width = `${buttonSize}px`;
  newButton.style.height = `${buttonSize}px`;

  let cardValueText = document.createElement("p");
  buttonContainer.appendChild(cardValueText);

  cardValueText.innerText = `${cardSelected.value}`;
  cardValueText.style.position = "absolute";
  cardValueText.style.left = `${Xpos + 16 * pixelUnit}px`;
  cardValueText.style.top = `${Ypos + 7 * pixelUnit}px`;
  cardValueText.style.width = `${14*pixelUnit}px`;
  cardValueText.style.textAlign = "center";
  cardValueText.style.fontSize = `${5 * pixelUnit}px`;
  cardValueText.style.userSelect = "none";
  cardValueText.style.fontWeight = "bold";

  let cardMaximumText = document.createElement("p");
  buttonContainer.appendChild(cardMaximumText);

  cardMaximumText.innerText = `${cardSelected.maximum}`;
  cardMaximumText.style.position = "absolute";
  cardMaximumText.style.left = `${Xpos + 50 * pixelUnit}px`;
  cardMaximumText.style.top = `${Ypos + 54 * pixelUnit}px`;
  cardMaximumText.style.textAlign = "center";
  cardMaximumText.style.fontSize = `${4 * pixelUnit}px`;
  cardMaximumText.style.userSelect = "none";
  cardMaximumText.style.fontWeight = "bold";

  let cardNumberText = document.createElement("p");
  buttonContainer.appendChild(cardNumberText);

  cardNumberText.id = `${type + "Number"}`
  cardNumberText.innerText = `${getNumberOfElement(cardSelected)}`;
  cardNumberText.style.position = "absolute";
  cardNumberText.style.left = `${Xpos + 44 * pixelUnit}px`;
  cardNumberText.style.top = `${Ypos + 48 * pixelUnit}px`;
  cardNumberText.style.textAlign = "center";
  cardNumberText.style.fontSize = `${4 * pixelUnit}px`;
  cardNumberText.style.userSelect = "none";
  cardNumberText.style.fontWeight = "bold";

  let cardTitleText = document.createElement("p");
  buttonContainer.appendChild(cardTitleText);

  cardTitleText.innerText = `${cardSelected.title}`;
  cardTitleText.style.position = "absolute";
  cardTitleText.style.left = `${Xpos + 7 * pixelUnit}px`;
  cardTitleText.style.top = `${Ypos + 54 * pixelUnit}px`;
  cardTitleText.style.width = `${32 * pixelUnit}px`;
  cardTitleText.style.height = `${10 * pixelUnit}px`;
  cardTitleText.style.textAlign = "center";
  cardTitleText.style.verticalAlign = "middle";
  cardTitleText.style.fontSize = `${4 * pixelUnit}px`;
  cardTitleText.style.display = "table-cell";
  cardTitleText.style.userSelect = "none";
  cardTitleText.style.fontWeight = "bold";

  buttons.push(newButton);

  newButton.onclick = function () {
    if (
      !isPause &&
      cardSelected.value <= tileMap.players[0].stats.soulResource &&
      isCardAuthorized(cardSelected) &&
      tileMap.players[0].stats.soulResource >= 0
    ) {
      cleanMap();
      updateSelectedBtn({ type: cardSelected.type, value: cardSelected.value });
      renderCardDescription({
        type: cardSelected.type,
        value: cardSelected.value,
      });
      possibilityForClick();
      tileMap.draw(ctxScreen);
      inversePause();
      updateStatusText(pixelUnit);
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
  closeButton.style.position = "absolute";
  closeButton.style.left = `${7*pixelUnit}px`;
  closeButton.style.top = `${16*pixelUnit}px`;

  closeButton.style.width = `${closeButtonSize}px`;
  closeButton.style.height = `${closeButtonSize}px`;
  closeButton.onclick = function () {
    updateSelectedBtn({ type: undefined, value: undefined });
    renderCardDescription(selectedBtn);
    closeButton.remove();
    cleanMap();
    setTimeout(() => {
      inversePause();
    }, 100);
  };
}

export { drawCards, createCard };

function getNumberOfElement(element) {
  const array = tileMap.elements.find((e) => {
    return e.type === element.type;
  });
  if (array) {
    return array.element.length;
  }
  return 99;
}

export function updateNumberOfElement() {

  for(let element of tileMap.elements){
    let text = document.getElementById(`${element.type + "Number"}`)
    console.log(element.element.length);

    text.innerText = element.element.length
  }
}

function isCardAuthorized(element){
  return  tileMap.elements.some((e) =>
     e.type === element.type && e.element.length < element.maximum
  );

}