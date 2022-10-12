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
  if (up === "river" || down === "river") {
    drawRiverImage(x, y, 0, 1);
  }
  if (left === "river" || right === "river") {
    drawRiverImage(x, y, 1, 0);
  }
  if ((up === "river" || up === "1") && (left === "river" || left === "1")) {
    drawRiverImage(x, y, 2, 2);
  }
  if (
    (up === "river" || up === "1") &&
    (right === "river" || right === "river")
  ) {
    drawRiverImage(x, y, 0, 2);
  }
  if (
    (down === "river" || down === "1") &&
    (left === "river" || left === "1")
  ) {
    drawRiverImage(x, y, 2, 0);
  }
  if (
    (down === "river" || down === "1") &&
    (right === "river" || right === "river")
  ) {
    drawRiverImage(x, y, 0, 0);
  }
  if (up === "1") {
    drawRiverImage(x, y - 1, 1, 1);
  }
  if (down === "1") {
    drawRiverImage(x, y + 1, 1, 1);
  }
  if (left === "1") {
    drawRiverImage(x - 1, y, 1, 1);
  }
  if (right === "1") {
    drawRiverImage(x + 1, y, 1, 1);
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
