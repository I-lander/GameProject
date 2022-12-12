import {
  tileMap,
  tileSize,
  pixelUnit,
  inversePause,
  inverseLeveUp,
  gameScreen,
} from "../../app.js";
import { generateSpawn } from "../../player/NPCs/spawn.js";
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

  levelUpScreen.classList.remove("disable");
  for (let card = 0; card < choices; card++) {
    drawCards(levelUpScreen, cards, buttons);
  }
}

function drawCards(levelUpScreen, cards, buttons) {
  const buttonSize = { width: 256 * pixelUnit, height: 384 * pixelUnit };
  const Xpos =
    tileSize * 2 +
    buttonSize.width * buttons.length +
    buttons.length * tileSize;
  const Ypos = tileSize * 2;

  const SelectedCard =
    CARD_FOR_LEVEL_UP[Math.floor(Math.random() * CARD_FOR_LEVEL_UP.length)];
    // CARD_FOR_LEVEL_UP[0];
  let card = new SelectedCard();

  while (cards.some((existingCard) => existingCard.id === card.id)) {
    const SelectedCard =
      CARD_FOR_LEVEL_UP[Math.floor(Math.random() * CARD_FOR_LEVEL_UP.length)];
    // CARD_FOR_LEVEL_UP[buttons.length];
    card = new SelectedCard();
  }
  cards.push(card);

  const newButton = document.createElement("button");
  levelUpScreen.appendChild(newButton);
  newButton.id = `cardLevelUp_${buttons.length}`;
  newButton.style.width = `${buttonSize.width}px`;
  newButton.style.height = `${buttonSize.height}px`;
  newButton.style.backgroundRepeat = "no-repeat";
  newButton.style.backgroundSize = "cover";

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
    inverseLeveUp();
    inversePause();
  };

  buttons.push(newButton);
}

export { levelUpScreen };
