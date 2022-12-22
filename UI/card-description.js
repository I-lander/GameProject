import {
  gameScreen,
  pixelUnit,
  selectedBtn,
  sideScreen,
  tileMap,
  tileSize,
} from "../app.js";
import { CARD_ELEMENTS } from "../core/constants/tiles.js";
import { ASSETS } from "../core/loadAssets.js";
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
    selectedBtn.value <= tileMap.players[0].stats.soulResource
      ? "black"
      : "red";

  cardDescription.innerHTML = `<span id="cardValue" style="color:${ValueColor}">${cardSelected.value}</span>`;

  cardDescription.appendChild(ASSETS[cardSelected.type]);

  const cardValue = document.getElementById("cardValue");
  cardValue.style.position = "absolute";
  cardValue.style.fontSize = `${20 * pixelUnit}px`;
  cardValue.style.marginTop = `${3 * pixelUnit}px`;
  cardValue.style.width = `${tileSize * 2}px`;
  cardValue.style.height = `${tileSize}px`;
  cardValue.style.display = "flex";
  cardValue.style.alignItems = "center";
  cardValue.style.justifyContent = "center";

  const NumberColor =
    getNumberOfElement(cardSelected) < cardSelected.maximum ? "black" : "red";

  const numberVsMax = document.createElement("div");
  cardDescription.appendChild(numberVsMax);
  numberVsMax.innerHTML = `<span style="color:${NumberColor}">${getNumberOfElement(
    cardSelected
  )}</span>/${cardSelected.maximum}`;
  numberVsMax.style.position = "absolute";
  numberVsMax.style.fontSize = `${16 * pixelUnit}px`;
  numberVsMax.style.height = `${tileSize}px`;
  numberVsMax.style.right = `${tileSize + 3 * pixelUnit}px`;
  numberVsMax.style.marginTop = `${ 4 * pixelUnit}px`;
  numberVsMax.style.display = "flex";
  numberVsMax.style.alignItems = "center";
  numberVsMax.style.justifyContent = "center";

  const cardDescriptionTitle = document.createElement("div");
  cardDescription.append(cardDescriptionTitle);
  cardDescriptionTitle.innerHTML = `${cardSelected.title}`;
  cardDescriptionTitle.style.color = "rgba(50,50,50, 1)";
  cardDescriptionTitle.style.lineHeight = `${tileSize * 1.25}px`;
  cardDescriptionTitle.style.fontSize = `${24 * pixelUnit}px`;
  cardDescriptionTitle.style.paddingLeft = `${tileSize * 2}px`;
  cardDescriptionTitle.style.backgroundColor = "white";
  cardDescriptionTitle.style.height = `${tileSize}px`;

  const cardDescriptionText = document.createElement("div");
  cardDescription.append(cardDescriptionText);
  cardDescriptionText.innerHTML = `Cost: ${cardSelected.value}</br>Description: ${cardSelected.description}`;
  cardDescriptionText.style.color = "white";
  cardDescriptionText.style.margin = `${tileSize / 2}px`;
  cardDescriptionText.style.lineHeight = `${tileSize / 2}px`;
  cardDescriptionText.style.fontSize = `${10 * pixelUnit}px`;

  const imgTag = cardDescription.querySelector("img");
  if (imgTag) {
    imgTag.style.position = "absolute";
    imgTag.style.right = `0px`;
    imgTag.style.top = `0px`;
    imgTag.style.width = `${tileSize}px`;
  }
}

export { renderCardDescription };
