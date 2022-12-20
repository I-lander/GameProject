import { canvasScreen, startGame, tileSize, pixelUnit } from "../app.js";
import { ASSETS } from "../core/loadAssets.js";
import { marginLeft, marginTop } from "./ScreenInit.js";

export function gameOverScreen(level) {
  const gameOverScreen = document.getElementById("gameOverScreen");
  gameOverScreen.classList.remove("disable");

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
    const clicAudio = ASSETS["clic"];
    clicAudio.play();
    startGame();
    setTimeout(() => {
      gameOverScreen.classList.add("disable");
      gameOverScreenText.remove();
    }, 100);
  };
}
