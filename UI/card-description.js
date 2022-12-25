import {
  gameScreen,
  lowResources,
  pixelUnit,
  selectedBtn,
  sideScreen,
  tileMap,
  tileSize,
} from "../app.js";
import { CARD_ELEMENTS } from "../core/constants/tiles.js";
import { ASSETS } from "../core/loadAssets.js";
import { LowResource } from "../core/lowResource.js";
import { getNumberOfElement, playSound } from "../core/utils.js";
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
  cardDescription.innerHTML = "";

  const NumberColor =
    getNumberOfElement(cardSelected) < cardSelected.maximum ? "black" : "red";

  const cardDescriptionHeader = document.createElement("div");
  cardDescription.appendChild(cardDescriptionHeader);
  cardDescriptionHeader.style.backgroundColor = "white";
  cardDescriptionHeader.style.position = "absolute";
  cardDescriptionHeader.style.width = `${tileSize * 9.5 - 12 * pixelUnit}px`;
  cardDescriptionHeader.style.height = `${tileSize}px`;
  cardDescriptionHeader.style.top = `${4 * pixelUnit}px`;
  cardDescriptionHeader.style.left = `${4 * pixelUnit}px`;

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
  if (cardSelected.maximum) {
    numberVsMax.innerHTML = `<span style="color:${NumberColor}">${getNumberOfElement(
      cardSelected
    )}</span>/${cardSelected.maximum}`;
  }
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
  cardDescriptionText.innerHTML = `${cardSelected.description}`;
  cardDescriptionText.style.color = "white";
  cardDescriptionText.style.margin = `${tileSize * 1.75}px ${tileSize / 2}px`;
  cardDescriptionText.style.lineHeight = `${tileSize / 2}px`;
  cardDescriptionText.style.fontSize = `${10 * pixelUnit}px`;

  if (cardSelected.increaseMax) {
    const cardDescriptionFooter = document.createElement("div");
    cardDescription.appendChild(cardDescriptionFooter);
    cardDescriptionFooter.style.backgroundColor = "rgba(50,50,50,1)";
    cardDescriptionFooter.style.color = "white";
    cardDescriptionFooter.style.position = "absolute";
    cardDescriptionFooter.style.width = `${tileSize * 9.5 - 15 * pixelUnit}px`;
    cardDescriptionFooter.style.height = `${tileSize}px`;
    cardDescriptionFooter.style.top = `${
      tileSize * 7 - containerMargin * pixelUnit - 36 * pixelUnit
    }px`;
    cardDescriptionFooter.style.left = `${4 * pixelUnit}px`;
    cardDescriptionFooter.style.display = "flex";
    cardDescriptionFooter.style.alignItems = "center";
    cardDescriptionFooter.style.paddingLeft = `${4 * pixelUnit}px`;
    cardDescriptionFooter.innerHTML = `Increase max tile for ${cardSelected.increaseMax}`;

    cardDescriptionFooter.style.fontSize = `${12 * pixelUnit}px`;

    const addTileBtn = document.createElement("button");
    addTileBtn.classList.add("addTileBtn");
    cardDescriptionFooter.appendChild(addTileBtn);
    addTileBtn.style.position = "absolute";
    addTileBtn.style.top = `0px`;
    addTileBtn.style.right = `${4 * pixelUnit}px`;
    addTileBtn.style.width = `${tileSize}px`;
    addTileBtn.style.height = `${tileSize}px`;
    addTileBtn.onclick = () => {
      playSound("clic");
      if (cardSelected.increaseMax > tileMap.players[0].stats.soulResource) {
        lowResources.push(new LowResource());
        return;
      }
      ++cardSelected.maximum;
      tileMap.players[0].stats.soulResource -= cardSelected.increaseMax;
      numberVsMax.innerHTML = `<span style="color:${NumberColor}">${getNumberOfElement(
        cardSelected
      )}</span>/${cardSelected.maximum}`;
      tileMap.players[0].drawsoulResource();
    };
  }
}

export { renderCardDescription };
