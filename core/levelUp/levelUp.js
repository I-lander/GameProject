import { tileMap, tileSize, pixelUnit, inversePause } from "../../app.js";
import { CARD_FOR_LEVEL_UP } from "./cardForLevelUp.js";

const choices = 2;
const buttons = [];

function levelUpScreen() {
  for (let card = 0; card < choices; card++) {
    drawCards();
  }
}

function drawCards() {
  const buttonSize = { width: 256 * pixelUnit, height: 384 * pixelUnit };
  const Xpos =
    tileSize * 2 +
    buttonSize.width * buttons.length +
    buttons.length * tileSize;
  const Ypos = tileSize * 2;

  const levelUpScreen = document.getElementById("levelUpScreen");

  let newButton = document.createElement("button");
  levelUpScreen.appendChild(newButton);
  newButton.style.position = "absolute";
  newButton.style.left = `${Xpos}px`;
  newButton.style.top = `${Ypos}px`;
  newButton.style.width = `${buttonSize.width}px`;
  newButton.style.height = `${buttonSize.height}px`;

  const constSelectedCard =
    CARD_FOR_LEVEL_UP[Math.floor(Math.random() * CARD_FOR_LEVEL_UP.length)];

  const card = new constSelectedCard();

  newButton.onclick = card.function;

  buttons.push(newButton);
}

export { levelUpScreen };
