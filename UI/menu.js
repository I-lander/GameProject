import {
  inversePause,
  tileMap,
  tileSize,
  isPause,
  cleanMap,
  updatePressedBtn,
  pixelUnit,
} from "../app.js";
import { marginTop, marginLeft } from "./ScreenInit.js";

const buttons = [];

function drawMenu() {
  createButton("mountain");
  createButton("village");
  createButton("river");
  createButton("tower");
  createButton("thunder");
  for (let i = 0; i < 1; i++) {
    createButton("spider");
  }
  createButton("arrows")
}

function createButton(type) {
  const buttonSize = 64 * pixelUnit;
  const buttonContainer = document.getElementById("buttonContainer");
  let newButton = document.createElement("button");
  buttonContainer.appendChild(newButton);
  newButton.id = `${type + buttons.length}`;
  newButton.classList.add("buttonsTile");
  newButton.style.backgroundColor = "transparent";

  newButton.style.backgroundImage = `url(./src/images/card-${type}.png)`;
  if(type === "arrows" || type === "spider"){
  newButton.style.backgroundImage = `url(./src/images/${type}.png)`;
  }
  newButton.style.border = "none";
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
