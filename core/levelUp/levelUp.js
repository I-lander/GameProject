import {
  tileMap,
  tileSize,
  pixelUnit,
  inversePause,
  inverseLeveUp,
  gameScreen,
} from "../../app.js";
import { CARD_FOR_LEVEL_UP } from "./cardForLevelUp.js";

const choices = 2;
let buttons = [];

function levelUpScreen() {
  const levelUpScreen = document.getElementById("levelUpScreen");
  const levelText = document.createElement("p");
  levelUpScreen.appendChild(levelText);
  levelText.innerText = "Level : " + tileMap.players[0].level;
  levelText.style.position = "absolute";
  levelText.style.width = `${gameScreen.width}px`;
  levelText.style.margin = `${tileSize / 2}px`;
  levelText.style.textAlign = "center";
  levelText.style.fontSize = `${10 * pixelUnit}px`;

  levelUpScreen.classList.remove("disable");
  for (let card = 0; card < choices; card++) {
    drawCards(levelUpScreen);
  }
}

function drawCards(levelUpScreen) {
  const buttonSize = { width: 256 * pixelUnit, height: 384 * pixelUnit };
  const Xpos =
    tileSize * 2 +
    buttonSize.width * buttons.length +
    buttons.length * tileSize;
  const Ypos = tileSize * 2;

  const constSelectedCard =
    // CARD_FOR_LEVEL_UP[Math.floor(Math.random() * CARD_FOR_LEVEL_UP.length)];
    CARD_FOR_LEVEL_UP[buttons.length];

  const card = new constSelectedCard();

  const newButton = document.createElement("button");
  levelUpScreen.appendChild(newButton);
  newButton.id = `cardLevelUp_${buttons.length}`;
  newButton.style.position = "absolute";
  newButton.style.backgroundColor = "transparent";
  newButton.style.backgroundImage = `url(./src/images/card-levelUp.png)`;
  newButton.style.border = "none";
  newButton.style.width = `${buttonSize.width}px`;
  newButton.style.height = `${buttonSize.height}px`;
  newButton.style.backgroundRepeat = "no-repeat";
  newButton.style.backgroundSize = "cover";

  // newButton.style.padding = `${tileSize / 2}px`;
  newButton.style.left = `${Xpos}px`;
  newButton.style.top = `${Ypos}px`;
  newButton.style.width = `${buttonSize.width}px`;
  newButton.style.height = `${buttonSize.height}px`;

  const cardTitle = document.createElement("h1");
  newButton.append(cardTitle);
  cardTitle.innerText = card.title;
  cardTitle.style.position = "absolute";
  cardTitle.style.top = `${tileSize}px`;
  cardTitle.style.width = "100%";
  cardTitle.style.textAlign = "center";

  const cardDescription = document.createElement("p");
  newButton.append(cardDescription);

  cardDescription.innerHTML = card.description;
  cardDescription.style.margin = `${tileSize / 2}px`;
  cardDescription.style.textAlign = "center";
  cardDescription.style.fontSize = `${10 * pixelUnit}px`;
  cardDescription.style.lineHeight = `${tileSize / 2}px`;

  newButton.onclick = () => {
    card.function();
    levelUpScreen.classList.add("disable");
    inverseLeveUp();
    inversePause();
    buttons = [];
  };

  buttons.push(newButton);
}

export { levelUpScreen };
