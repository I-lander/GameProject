import { canvasScreen, startGame, tileSize, pixelUnit } from "../app.js";
import { ASSETS } from "../core/loadAssets.js";
import { playSound } from "../core/utils.js";
import { marginLeft, marginTop } from "./ScreenInit.js";

export function gameOverScreen(level) {
  const gameOverScreen = document.getElementById("gameOverScreen");
  gameOverScreen.classList.remove("disable");

  const mainMenuCanvas = document.getElementById("mainMenuCanvas");
  const mainMenu = document.getElementById("mainMenu");

  const gameOverScreenText = document.createElement("p");
  gameOverScreen.appendChild(gameOverScreenText);
  gameOverScreenText.id = "gameOverScreenText";
  gameOverScreenText.innerText = `Level Reached : ${level}`;
  gameOverScreenText.style.fontSize = `${tileSize * 1.5}px`;
  gameOverScreenText.style.display = "flex";

  const resetButton = document.getElementById("resetButton");
  resetButton.style.height = `${tileSize}px`;
  resetButton.style.width = `${tileSize * 6}px`;

  resetButton.style.top = `${marginTop + tileSize * 9}px`;
  resetButton.style.left = `${
    marginLeft + canvasScreen.width / 2 - tileSize * 3
  }px`;
  resetButton.style.fontSize = `${tileSize * 0.55}px`;
  resetButton.style.padding = `${9.5 * pixelUnit}px`;

  resetButton.onclick = () => {
    playSound("clic")
    setTimeout(() => {
      gameOverScreen.classList.add("disable");
      gameOverScreenText.remove();
      mainMenu.classList.remove("disable");
      mainMenuCanvas.classList.remove("disable");
    }, 100);
  };
}
