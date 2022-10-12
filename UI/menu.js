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
  createButton("mountain");
  createButton("river");
  for (let i = 0; i < 1; i++) {
    createButton("spider");
  }
}

function createButton(type, ) {
  const buttonSize = (canvasMenu.width - (tileSize / 5) * 6) / 6;
  const buttonContainer = document.getElementById("buttonContainer");
  let newButton = document.createElement("button");
  buttonContainer.appendChild(newButton);
  newButton.id = `${type + buttons.length}`;
  newButton.classList.add("buttonsTile");
  newButton.style.backgroundImage = `url(./src/images/${type}.png)`;
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
