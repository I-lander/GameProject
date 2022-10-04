import { tileMap, tileSize } from "../app.js";
import { mapSizeX, mapSizeY } from "../level/map.js";

const screenRatio = 2 / 3;
let marginTop = 0

function screenInit(canvasScreen, canvasMenu) {
  canvasScreen.width = innerWidth * screenRatio;
  canvasScreen.width = innerWidth * screenRatio;
  tileMap.tileSize = canvasScreen.width / mapSizeX;
  canvasScreen.height = mapSizeY * tileMap.tileSize;

  marginTop = innerHeight / 2 - canvasScreen.height / 2
  canvasScreen.style.marginTop = `${marginTop}px`;
  canvasScreen.style.boxShadow = `inset 0 0 ${tileMap.tileSize}px ${tileMap.tileSize/2}px rgba(0,0,0,0.5)`;

  canvasMenu.width = innerWidth - canvasScreen.width;
  canvasMenu.height = canvasScreen.height;
  canvasMenu.style.marginTop = `${marginTop}px`;
  canvasMenu.style.left = `${canvasScreen.width}px`;
}

export { screenInit, marginTop };
