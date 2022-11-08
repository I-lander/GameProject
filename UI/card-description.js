import {
  gameScreen,
  pixelUnit,
  selectedBtn,
  sideScreen,
  tileSize,
} from "../app.js";
import { CARD_ELEMENTS } from "../core/constants.js";
import { marginLeft, marginTop } from "./ScreenInit.js";

function renderCardDescription(selectedCard) {
  const cardSelected = selectedCard
    ? CARD_ELEMENTS.find((card) => {
        return card.type === selectedCard.type;
      })
    : null;
  const cardDescription = document.getElementById("cardDescription");

  cardDescription.style.left = `${gameScreen.width + marginLeft}px`;
  cardDescription.style.width = `${sideScreen.width}px`;
  cardDescription.style.height = `${tileSize * 7}px`;
  cardDescription.style.bottom = `${marginTop}px`;

  if (!selectedBtn || !selectedBtn.type) {
    cardDescription.innerHTML = "";
    return;
  }

  cardDescription.innerHTML = `<img src="./src/images/${cardSelected.type}.png"><h1>${cardSelected.title}</h1><p>Cost: ${cardSelected.value}</br>
    Description: ${cardSelected.description}</p>`;

  const h1Tag = cardDescription.querySelector("h1");
  if (h1Tag) {
    h1Tag.style.color = "rgba(50,50,50, 1)";
    h1Tag.style.lineHeight = `${tileSize * 1.25}px`;
    h1Tag.style.fontSize = `${24 * pixelUnit}px`;

    h1Tag.style.paddingLeft = `${tileSize / 2}px`;
    h1Tag.style.backgroundColor = "white";
    h1Tag.style.height = `${tileSize}px`;
  }
  const pTag = cardDescription.querySelector("p");
  if (pTag) {
    pTag.style.color = "white";
    pTag.style.margin = `${tileSize / 2}px`;
    pTag.style.lineHeight = `${tileSize / 2}px`;
    pTag.style.fontSize = `${10 * pixelUnit}px`;
  }
  const imgTag = cardDescription.querySelector("img");
  if (imgTag) {
    imgTag.style.position = "absolute";
    imgTag.style.right = `0px`;
    imgTag.style.width = `${tileSize}px`;
  }
}

export { renderCardDescription };
