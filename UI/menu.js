import { tileSize } from "../app.js"
import {marginTop} from "./ScreenInit.js"

const buttons = []

function drawMenu(ctx, width) {
  const mountainButton = document.getElementById("mountainButton")
  if(mountainButton){
    mountainButton.remove()
  }
  const riverButton = document.getElementById("riverButton")
  if(riverButton){
    riverButton.remove()
  }
  const spawnButton = document.getElementById("spawnButton")
  if(spawnButton){
    spawnButton.remove()
  }
  createButton(width, "mountainButton", './src/images/mountain.png');
  createButton(width, "riverButton");
  createButton(width, "spawnButton", './src/images/spider.png');
}

function createButton(width, type, icon) {
  const buttonSize = tileSize * 2
  let newButton = document.createElement("button");
  document.body.appendChild(newButton);
  newButton.id = type;
  newButton.classList.add("buttonsTile");
  newButton.style.backgroundImage = `url(${icon})`
  newButton.style.left = `${width + buttons.length * buttonSize}px`;
  newButton.style.top = `${marginTop + tileSize}px`;
  newButton.style.margin = "10px";
  newButton.style.width = `${buttonSize}px`;
  newButton.style.height = `${buttonSize}px`;

  buttons.push(newButton)
}



export { drawMenu };
