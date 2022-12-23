import {
  tileMap,
  tileSize,
  pixelUnit,
  inversePause,
  inverseLeveUp,
  gameScreen,
} from "../../app.js";
import { generateSpawn } from "../../player/NPCs/spawn.js";
import { ASSETS } from "../loadAssets.js";
import { playSound } from "../utils.js";
import { CARD_FOR_LEVEL_UP } from "./cardForLevelUp.js";

const choices = 2;

function levelUpScreen() {
  let buttons = [];
  let cards = [];

  tileMap.players[0].level++;
  const levelUpScreen = document.getElementById("levelUpScreen");
  const levelNumber = document.getElementById("levelNumber");

  levelNumber.innerText = "Level : " + tileMap.players[0].level;
  levelNumber.style.position = "absolute";
  levelNumber.style.width = `${gameScreen.width}px`;
  levelNumber.style.margin = `${tileSize / 2}px`;
  levelNumber.style.textAlign = "center";
  levelNumber.style.fontSize = `${10 * pixelUnit}px`;

  const isBonus = Math.random() < 0.5 ? true : false;

  levelUpScreen.classList.remove("disable");
  for (let card = 0; card < choices; card++) {
    drawCards(levelUpScreen, cards, buttons, isBonus);
  }
}

function drawCards(levelUpScreen, cards, buttons, isBonus) {
  const buttonSize = { width: 256 * pixelUnit, height: 384 * pixelUnit };
  const Xpos =
    tileSize * 2 +
    buttonSize.width * buttons.length +
    buttons.length * tileSize;
  const Ypos = tileSize * 2;

  let cardForSelectionArray = [];

  CARD_FOR_LEVEL_UP.forEach((card) => {
    cardForSelectionArray.push(new card());
  });

  const cardForSelection = cardForSelectionArray.filter((card) => {
    return card.isBonus === isBonus;
  });
  let card =
    cardForSelection[Math.floor(Math.random() * cardForSelection.length)];
    // cardForSelection[0];

  while (cards.some((existingCard) => existingCard.id === card.id)) {
    card =
      cardForSelection[Math.floor(Math.random() * cardForSelection.length)];
  }
  cards.push(card);

  const cardImg = ASSETS["cardLevelUp"].cloneNode()
  const newButton = document.createElement("button");
  levelUpScreen.appendChild(newButton);
  newButton.appendChild(cardImg);
  cardImg.style.width = "100%"
  cardImg.style.height = "100%"
  cardImg.style.left = "0px"
  cardImg.style.top = "0px"
  newButton.id = `cardLevelUp_${buttons.length}`;
  newButton.style.width = `${buttonSize.width}px`;
  newButton.style.height = `${buttonSize.height}px`;


  newButton.style.left = `${Xpos}px`;
  newButton.style.top = `${Ypos}px`;
  newButton.style.width = `${buttonSize.width}px`;
  newButton.style.height = `${buttonSize.height}px`;

  const cardTile = document.createElement("img");
  const tile = (buttonSize.width * 2) / 3;
  newButton.append(cardTile);
  cardTile.src = `./src/images/${card.tile}.png`;
  cardTile.style.width = `${tile}px`;
  cardTile.style.height = `${tile}px`;
  cardTile.style.top = `${0 * pixelUnit}px`;
  cardTile.style.left = `${0 * pixelUnit}px`;

  const cardBonus = document.createElement("img");
  newButton.append(cardBonus);
  const bonus = tile / 2;
  cardBonus.src = `./src/images/${card.bonus}.png`;
  cardBonus.style.width = `${bonus}px`;
  cardBonus.style.height = `${bonus}px`;
  cardBonus.style.top = `${tile / 2}px`;
  cardBonus.style.left = `${tile}px`;

  const cardDescription = document.createElement("p");
  newButton.append(cardDescription);
  const buttonUnit = tile / 32;
  cardDescription.innerHTML = card.description;
  cardDescription.style.width = `${buttonSize.width - 16 * buttonUnit}px`;
  cardDescription.style.top = `${tile + 4 * buttonUnit}px`;
  cardDescription.style.left = `${buttonUnit * 8}px`;
  cardDescription.style.textAlign = "center";
  cardDescription.style.fontSize = `${9 * pixelUnit}px`;
  cardDescription.style.lineHeight = `${tileSize / 2}px`;

  newButton.onclick = () => {
    card.function();
    card.id === "PlaceSpawnPoint" || card.id === "Spawn"
      ? null
      : generateSpawn();
    levelUpScreen.classList.add("disable");
    playSound("clic")
    inverseLeveUp();
    inversePause();
  };

  buttons.push(newButton);
}

export { levelUpScreen };
