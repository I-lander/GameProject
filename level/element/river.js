import { tileMap, tileSize, ctxScreen, canvasScreen } from "../../app.js";

const river = new Image();
river.src = "./src/images/river.png";
const spriteRes = 32;

function drawRiver(x, y) {
  const neighbors = tileMap.getNeighbors({ x: x, y: y });
  const up = neighbors[0].tileValue;
  const down = neighbors[1].tileValue;
  const left = neighbors[2].tileValue;
  const right = neighbors[3].tileValue;

  if (up === "1" || down === "1") {
    drawRiverImage(x, y, 0, 1);
  }
  if (left === "1" || right === "1") {
    drawRiverImage(x, y, 1, 0);
  }
  if (up === "5" || down === "5") {
    drawRiverImage(x, y, 0, 1);
  }
  if (left === "5" || right === "5") {
    drawRiverImage(x, y, 1, 0);
  }
  if (up === "5" && left === "5") {
    drawRiverImage(x, y, 2, 2);
  }
  if (up === "5" && right === "5") {
    drawRiverImage(x, y, 0, 2);
  }
  if (down === "5" && left === "5") {
    drawRiverImage(x, y, 2, 0);
  }
  if (down === "5" && right === "5") {
    drawRiverImage(x, y, 0, 0);
  }
  if(up === "1"){
    drawRiverImage(x, y-1, 1, 1);
  }
}

function drawRiverImage(x, y, spriteX, spriteY) {
  ctxScreen.drawImage(
    river,
    spriteX * spriteRes,
    spriteY * spriteRes,
    spriteRes,
    spriteRes,
    tileSize * x,
    tileSize * y,
    tileSize,
    tileSize
  );
}

export { drawRiver };