import { tileSize, tileMap } from "../../app.js";
import { mapSizeX, mapSizeY } from "./map.js";

export class Arrow {
  constructor(x, y) {
    this.x = x * tileSize;
    this.y = y * tileSize;
    this.position = { x: x, y: y };
  }
}

const arrow = new Image();
arrow.src = "./src/images/arrows.png";
const spriteSize = 32;

function drawArrowsImage(ctx, x, y, canvasX, canvasY) {
  ctx.drawImage(
    arrow,
    canvasX * spriteSize,
    canvasY * spriteSize,
    spriteSize,
    spriteSize,
    tileSize * x,
    tileSize * y,
    tileSize,
    tileSize
  );
}

export function drawArrows(ctx, x, y) {
  if (x === 0) {
    drawArrowsImage(ctx, x, y, 1, 0);
  }
  if (y === 0) {
    drawArrowsImage(ctx, x, y, 1, 1);
  }
  if (x === mapSizeX - 1) {
    drawArrowsImage(ctx, x, y,0, 1);
  }
  if (y === mapSizeY - 1) {
    drawArrowsImage(ctx, x, y, 0, 0);
  }
}
