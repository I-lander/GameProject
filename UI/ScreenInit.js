import { tileMap } from "../app.js";
import { mapSizeX, mapSizeY } from "../level/map.js";

const screenRatio = 2 / 3;
let marginTop = 0

// function screenInit(canvasScreen, canvasMenu) {
//   canvasScreen.height = innerHeight;
//   tileMap.tileSize = canvasScreen.height / mapSizeY;
//   canvasScreen.width = mapSizeX * tileMap.tileSize;
//   if (canvasScreen.width > innerWidth * screenRatio) {
//     canvasScreen.width = innerWidth * screenRatio;
//     tileMap.tileSize = canvasScreen.width / mapSizeX;
//     canvasScreen.height = mapSizeY * tileMap.tileSize;
//     canvasScreen.style.top = `${innerHeight / 2 - canvasScreen.height / 2}px`;
//   }
//   canvasMenu.width = innerWidth - canvasScreen.width;
//   canvasMenu.style.height = "100%";
//   canvasMenu.style.left = `${canvasScreen.width}px`;
// }

function screenInit(canvasScreen, canvasMenu) {

  canvasScreen.width = innerWidth * screenRatio;
  canvasScreen.width = innerWidth * screenRatio;
  tileMap.tileSize = canvasScreen.width / mapSizeX;
  canvasScreen.height = mapSizeY * tileMap.tileSize;

  marginTop = innerHeight / 2 - canvasScreen.height / 2
  canvasScreen.style.marginTop = `${marginTop}px`;

  canvasMenu.width = innerWidth - canvasScreen.width;
  canvasMenu.height = canvasScreen.height;
  canvasMenu.style.marginTop = `${marginTop}px`;
  canvasMenu.style.left = `${canvasScreen.width}px`;
}

export { screenInit, marginTop };
