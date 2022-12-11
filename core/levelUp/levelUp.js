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
  // CARD_FOR_LEVEL_UP[buttons.length];
  let card = new SelectedCard();

  while (cards.some((existingCard) => existingCard.title === card.title)) {
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

  // const cardTitle = document.createElement("h1");
  // newButton.append(cardTitle);
  // cardTitle.style.fontSize = `${26 * pixelUnit}px`;
  // cardTitle.innerHTML = card.title;
  // cardTitle.style.position = "absolute";
  // cardTitle.style.top = `${tileSize}px`;
  // cardTitle.style.left = `${tileSize / 2}px`;
  // cardTitle.style.width = `${256 * pixelUnit - 32 * pixelUnit}px`;
  // cardTitle.style.height = `${tileSize*4}px`;

  const cardBonus = document.createElement("img");
  newButton.append(cardBonus);
  cardBonus.src = `./src/images/${card.bonus}.png`;
  cardBonus.style.width = `${62*pixelUnit}px`
  cardBonus.style.height = `${62*pixelUnit}px`
  cardBonus.style.top = `${0*pixelUnit}px`
  cardBonus.style.left = `${buttonSize.width/2 - 62*pixelUnit/2}px`

  const cardTile = document.createElement("img");
  newButton.append(cardTile);
  cardTile.src = `./src/images/${card.tile}.png`;
  cardTile.style.width = `${124*pixelUnit}px`
  cardTile.style.height = `${124*pixelUnit}px`
  cardTile.style.top = `${62*pixelUnit}px`
  cardTile.style.left = `${buttonSize.width/2 - 124*pixelUnit/2}px`

  const cardDescription = document.createElement("p");
  newButton.append(cardDescription);
  cardDescription.innerHTML = card.description;
  cardDescription.style.width = "100%";
  cardDescription.style.top = `${tileSize * 7}px`;
  cardDescription.style.textAlign = "center";
  cardDescription.style.fontSize = `${10 * pixelUnit}px`;
  cardDescription.style.lineHeight = `${tileSize / 2}px`;

  newButton.onclick = () => {
    card.function();
    card.title === "Spawn Point" || card.title === "Spawn"
      ? null
      : generateSpawn();
    levelUpScreen.classList.add("disable");
    inverseLeveUp();
    inversePause();
  };

  buttons.push(newButton);
}

export { levelUpScreen };
