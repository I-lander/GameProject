import { canvasScreen, startGame, tileSize } from "../app.js";
import { marginLeft, marginTop } from "./ScreenInit.js";

export function gameOverScreen(level) {
  const gameOverScreen = document.getElementById("gameOverScreen");
  gameOverScreen.classList.remove("disable");

  const gameOverScreenText = document.createElement("p");
  gameOverScreen.appendChild(gameOverScreenText);
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

  resetButton.onclick = () => {
    startGame();
    setTimeout(() => {
      gameOverScreen.classList.add("disable");
    }, 100);
  };
}
