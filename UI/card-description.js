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

function renderCardDescription(selectedCard = undefined) {
  const cardSelected = selectedCard
    ? CARD_ELEMENTS.find((card) => {
        return card.type === selectedCard.type;
      })
    : null;
  const cardDescription = document.getElementById("cardDescription");
  const containerMargin = 16;

  cardDescription.style.left = `${gameScreen.width + marginLeft}px`;
  cardDescription.style.width = `${
    sideScreen.width - tileSize - 4 * pixelUnit
  }px`;
  cardDescription.style.margin = `0px ${containerMargin * pixelUnit}px`;
  cardDescription.style.height = `${
    tileSize * 7 - containerMargin * pixelUnit
  }px`;
  cardDescription.style.bottom = `${marginTop + containerMargin * pixelUnit}px`;

  if (!selectedBtn || !selectedBtn.type) {
    cardDescription.innerHTML = "";
    return;
  }
  cardDescription.innerHTML = ""
  
  const NumberColor =
    getNumberOfElement(cardSelected) < cardSelected.maximum ? "black" : "red";

  const cardDescriptionHeader = document.createElement("div");
  cardDescription.appendChild(cardDescriptionHeader);
  cardDescriptionHeader.style.backgroundColor = "white";
  cardDescriptionHeader.style.position = "absolute"
  cardDescriptionHeader.style.width = `${tileSize* 9.5 - 12*pixelUnit}px`
  cardDescriptionHeader.style.height = `${tileSize}px`
  cardDescriptionHeader.style.top = `${ 4*pixelUnit}px`
  cardDescriptionHeader.style.left = `${ 4*pixelUnit}px`

  const cardValue = document.createElement("p");
  cardDescriptionHeader.appendChild(cardValue);
  cardValue.innerHTML = `${cardSelected.value}`;
  cardValue.style.color =
    selectedBtn.value <= tileMap.players[0].stats.soulResource
      ? "black"
      : "red";
  cardValue.style.position = "absolute";
  cardValue.style.fontSize = `${16 * pixelUnit}px`;
  cardValue.style.marginTop = `${3 * pixelUnit}px`;
  cardValue.style.width = `${tileSize * 1.5}px`;
  cardValue.style.height = `${tileSize}px`;
  cardValue.style.display = "flex";
  cardValue.style.alignItems = "center";
  cardValue.style.justifyContent = "center";

  const numberVsMax = document.createElement("div");
  cardDescriptionHeader.appendChild(numberVsMax);
  numberVsMax.innerHTML = `<span style="color:${NumberColor}">${getNumberOfElement(
    cardSelected
  )}</span>/${cardSelected.maximum}`;
  // numberVsMax.innerHTML = "99/99"
  numberVsMax.style.position = "absolute";
  numberVsMax.style.fontSize = `${14 * pixelUnit}px`;
  numberVsMax.style.height = `${tileSize}px`;
  numberVsMax.style.right = `${tileSize + 5 * pixelUnit}px`;
  numberVsMax.style.marginTop = `${4 * pixelUnit}px`;
  numberVsMax.style.display = "flex";
  numberVsMax.style.alignItems = "center";
  numberVsMax.style.justifyContent = "center";

  const cardDescriptionImg = ASSETS[cardSelected.type];
  cardDescriptionHeader.appendChild(cardDescriptionImg);
  cardDescriptionImg.style.position = "absolute";
  cardDescriptionImg.style.right = `0px`;
  cardDescriptionImg.style.top = `0px`;
  cardDescriptionImg.style.height = `${tileSize}px`;

  const cardDescriptionTitle = document.createElement("div");
  cardDescriptionHeader.append(cardDescriptionTitle);
  cardDescriptionTitle.innerHTML = `${cardSelected.title}`;
  cardDescriptionTitle.style.color = "rgba(50,50,50, 1)";
  cardDescriptionTitle.style.marginTop = `${9 * pixelUnit}px`;
  cardDescriptionTitle.style.fontSize = `${20 * pixelUnit}px`;
  cardDescriptionTitle.style.paddingLeft = `${tileSize * 1.5}px`;
  cardDescriptionTitle.style.height = `${tileSize}px`;

  const cardDescriptionText = document.createElement("div");
  cardDescription.append(cardDescriptionText);
  cardDescriptionText.innerHTML = `Cost: ${cardSelected.value}</br>Description: ${cardSelected.description}`;
  cardDescriptionText.style.color = "white";
  cardDescriptionText.style.margin = `${tileSize * 1.75}px ${tileSize/2}px`;
  cardDescriptionText.style.lineHeight = `${tileSize / 2}px`;
  cardDescriptionText.style.fontSize = `${10 * pixelUnit}px`;
}

export { renderCardDescription };
