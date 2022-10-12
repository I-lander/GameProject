import {
  inversePause,
  tileMap,
  tileSize,
  isPause,
  cleanMap,
  ctxScreen,
  updatePressedBtn,
} from "../app.js";
import { marginTop, marginLeft } from "./ScreenInit.js";

const buttons = [];

function drawMenu(ctx, width) {
  const mountainButton = document.getElementById("mountainButton");
  if (mountainButton) {
    mountainButton.remove();
  }
  const riverButton = document.getElementById("riverButton");
  if (riverButton) {
    riverButton.remove();
  }
  const spawnButton = document.getElementById("spawnButton");
  if (spawnButton) {
    spawnButton.remove();
  }
  createButton("4", "./src/images/mountain.png");
  createButton("5", "./src/images/river.png");
  for (let i = 0; i < 1; i++) {
    createButton("spawn", "./src/images/spider.png");
  }
}

function createButton(type, icon) {
  const buttonSize = (canvasMenu.width - (tileSize / 5) * 6) / 6;
  const buttonContainer = document.getElementById("buttonContainer");
  let newButton = document.createElement("button");
  buttonContainer.appendChild(newButton);
  newButton.id = `${type + buttons.length}`;
  newButton.classList.add("buttonsTile");
  newButton.style.backgroundImage = `url(${icon})`;
  newButton.style.left = `${
    marginLeft + canvasScreen.width + buttons.length * buttonSize
  }px`;
  newButton.style.top = `${marginTop + tileSize}px`;
  newButton.style.width = `${buttonSize}px`;
  newButton.style.height = `${buttonSize}px`;

  buttons.push(newButton);

  newButton.onclick = function () {
    if (!isPause) {
      cleanMap();
      tileMap.selectedBtn = type;
      updatePressedBtn(newButton);
      setTimeout(() => {
        inversePause();
      }, 100);
    }
  };
}

export { drawMenu, createButton };
