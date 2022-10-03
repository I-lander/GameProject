import {tileMap} from "../app.js"
import {mapSizeX, mapSizeY} from "../level/map.js"

const screenRatio = 2/3

function screenInit(canvasScreen, canvasMenu) {
  canvasScreen.height = innerHeight;
  tileMap.tileSize = canvasScreen.height / mapSizeY;
  canvasScreen.width = mapSizeX * tileMap.tileSize;
  if (canvasScreen.width > innerWidth * screenRatio) {
    canvasScreen.width = innerWidth * screenRatio;
    tileMap.tileSize = canvasScreen.width / mapSizeX;
    canvasScreen.height = mapSizeY * tileMap.tileSize;
  }
  canvasMenu.width = innerWidth - canvasScreen.width;
  canvasMenu.style.left = `${canvasScreen.width}px`;
}

export { screenInit };
