import { tileMap, tileSize } from "../app.js";
import { mapSizeX, mapSizeY } from "../level/map.js";

const screenRatio = 2 / 3;
let marginTop = 0;
let marginLeft = 0;

function screenInit(canvasScreen, canvasMenu) {
  const screenWidth = innerWidth;
  const screenHeight = innerHeight;
  canvasScreen.width = screenWidth * screenRatio;
  tileMap.tileSize = canvasScreen.width / mapSizeX;
  let tileSize = tileMap.tileSize;
  canvasScreen.height = mapSizeY * tileSize;
  canvasMenu.width = screenWidth - canvasScreen.width;

  if (canvasScreen.height > screenHeight) {
    canvasScreen.height = screenHeight;
    tileMap.tileSize = canvasScreen.height / mapSizeY;
    tileSize = tileMap.tileSize;
    canvasScreen.width = mapSizeX * tileSize;
    canvasMenu.width = canvasScreen.width / 2;
    marginLeft = (screenWidth - (canvasScreen.width + canvasMenu.width)) / 2;
  }

  marginTop = screenHeight / 2 - canvasScreen.height / 2;

  canvasScreen.style.marginTop = `${marginTop}px`;
  canvasScreen.style.marginLeft = `${marginLeft}px`;
  canvasScreen.style.boxShadow = `inset 0 0 ${tileSize}px ${
    tileSize / 2
  }px rgba(0,0,0,0.5)`;

  canvasMenu.height = canvasScreen.height;
  canvasMenu.style.marginTop = `${marginTop}px`;
  canvasMenu.style.left = `${canvasScreen.width + marginLeft}px`;

  const buttonContainer = document.getElementById("buttonContainer");
  buttonContainer.style.left = `${canvasScreen.width + marginLeft}px`;
  buttonContainer.style.width = `${canvasMenu.width - (tileSize/5)*6}px`;
  buttonContainer.style.height = `${(canvasMenu.width / 6) * 3}px`;
  buttonContainer.style.padding = `${tileSize/5}px`;
  buttonContainer.style.margin = `${tileSize/5}px`;
  buttonContainer.style.border = `${tileSize/5}px solid`;

  buttonContainer.style.top = `${tileSize * 3 + marginTop}px`;

  const mainMenu = document.getElementById("mainMenu");
  const mainMenuP = mainMenu.querySelector("p");
  mainMenuP.style.fontSize = `${tileSize / 2}px`;
  mainMenuP.style.lineHeight = `${tileSize / 20}rem`;

  const mainMenuImg = mainMenu.querySelector("img");
  mainMenuImg.style.margin = `${tileSize}px`;
  mainMenuImg.style.height = `${tileSize * 3}px`;

  const mainMenuBtn = mainMenu.querySelector("button");
  mainMenuBtn.style.height = `${tileSize}px`;
  mainMenuBtn.style.marginTop = "4.5rem";
  mainMenuBtn.style.fontSize = `${tileSize / 2}px`;
}

export { screenInit, marginTop, marginLeft };
