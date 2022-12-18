import {
  gameScreen,
  pixelUnit,
  selectedBtn,
  sideScreen,
  tileMap,
  tileSize,
} from "../app.js";
import { CARD_ELEMENTS } from "../core/constants/tiles.js";
import { getNumberOfElement } from "../core/utils.js";
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

  const ValueColor =
  selectedBtn.value <= tileMap.players[0].stats.soulResource ? "black" : "red";

  cardDescription.innerHTML = `<img src="./src/images/${cardSelected.type}.png"><span id="cardValue" style="color:${ValueColor}">${cardSelected.value}</span>
  <h1>${cardSelected.title}</h1>
  <p>Cost: ${cardSelected.value}</br>Description: ${cardSelected.description}</p>`;

  const numberVsMax = document.createElement("p");
  cardDescription.appendChild(numberVsMax);

  const cardValue = document.getElementById("cardValue")
  cardValue.style.position = "absolute"
  cardValue.style.fontSize = `${20 * pixelUnit}px`;
  cardValue.style.marginTop = `${3 * pixelUnit}px`;
  cardValue.style.width = `${tileSize*2}px`
  cardValue.style.height = `${tileSize}px`
  cardValue.style.display = "flex";
  cardValue.style.alignItems = "center";
  cardValue.style.justifyContent = "center";


  const NumberColor =
    getNumberOfElement(cardSelected) < cardSelected.maximum ? "black" : "red";

  numberVsMax.innerHTML = `<span style="color:${NumberColor}">${getNumberOfElement(
    cardSelected
  )}</span>/${cardSelected.maximum}`;
  numberVsMax.style.position = "absolute";
  numberVsMax.style.fontSize = `${16 * pixelUnit}px`;
  numberVsMax.style.height = `${tileSize}px`;
  numberVsMax.style.right = `${tileSize + 3 * pixelUnit}px`;
  numberVsMax.style.top = `${0}px`;
  numberVsMax.style.display = "flex";
  numberVsMax.style.alignItems = "center";

  const h1Tag = cardDescription.querySelector("h1");
  if (h1Tag) {
    h1Tag.style.color = "rgba(50,50,50, 1)";
    h1Tag.style.lineHeight = `${tileSize * 1.25}px`;
    h1Tag.style.fontSize = `${24 * pixelUnit}px`;
    h1Tag.style.paddingLeft = `${tileSize*2}px`;
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
