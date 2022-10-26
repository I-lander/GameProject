import { tileMap, ctxScreen as ctx } from "../app.js";
import { mapSizeX, mapSizeY } from "../level/map.js";

const screenRatio = 2 / 3;
let marginTop = 0;
let marginLeft = 0;

function screenInit(canvasScreen, canvasMenu) {
  const screenWidth = innerWidth;
  const screenHeight = innerHeight;
  canvasScreen.width = innerWidth;
  tileMap.tileSize = (canvasScreen.width * screenRatio) / mapSizeX;
  let tileSize = tileMap.tileSize;
  canvasScreen.height = mapSizeY * tileSize;

  if (canvasScreen.height > screenHeight) {
    canvasScreen.height = screenHeight;
    tileMap.tileSize = canvasScreen.height / mapSizeY;
    tileSize = tileMap.tileSize;
    canvasScreen.width = mapSizeX * tileSize + (mapSizeX * tileSize) / 2;
    marginLeft = (screenWidth - canvasScreen.width) / 2;
  }
  marginTop = screenHeight / 2 - canvasScreen.height / 2;

  canvasScreen.style.marginTop = `${marginTop}px`;
  canvasScreen.style.marginLeft = `${marginLeft}px`;

  const gameScreen = {
    width: mapSizeX * tileSize,
    height: mapSizeY * tileSize,
  };

  const sideScreen = {
    width: canvasScreen.width - gameScreen.width,
    height: canvasScreen.height,
  };

  const pixelUnit = tileSize / 32;

  const buttonContainer = document.getElementById("buttonContainer");
  buttonContainer.style.left = `${gameScreen.width + marginLeft}px`;
  buttonContainer.style.width = `${sideScreen.width}px`;
  buttonContainer.style.height = `${(sideScreen.width / 5) * 3}px`;

  buttonContainer.style.top = `${tileSize * 3 + marginTop}px`;

  const mainMenu = document.getElementById("mainMenu");
  const mainMenuP = mainMenu.querySelector("p");
  mainMenuP.style.fontSize = `${12 * pixelUnit}px`;
  mainMenuP.style.lineHeight = `${24 * pixelUnit}px`;

  const mainMenuImg = mainMenu.querySelector("img");
  mainMenuImg.style.margin = `${tileSize}px`;
  mainMenuImg.style.height = `${96 * pixelUnit}px`;

  const mainMenuBtn = mainMenu.querySelector("button");
  mainMenuBtn.style.height = `${tileSize}px`;
  mainMenuBtn.style.marginTop = "4.5rem";
  mainMenuBtn.style.fontSize = `${16 * pixelUnit}px`;
}

function drawSideScreenBackground(ctx, gameScreen, sideScreen) {
  ctx.save();
  ctx.fillStyle = "rgba(50,50,50, 1)";
  ctx.fillRect(gameScreen.width, 0, sideScreen.width, sideScreen.height);
  ctx.restore();
}

export { screenInit, drawSideScreenBackground, marginTop, marginLeft };
