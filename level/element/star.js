import { tileSize, pixelUnit } from "../../app.js";

export class Star {
  constructor(x, y, image) {
    this.x = x * tileSize;
    this.y = y * tileSize;
    this.position = { x: x, y: y };
    this.type = "star"
    this.stats = {
      range : tileSize * 2.5
    }

    this.starImage = image
  }

  update(ctx){
    ctx.drawImage(
      this.starImage,
      this.x,
      this.y,
      tileSize,
      tileSize
    );
    ctx.beginPath();
    ctx.lineWidth = 1 * pixelUnit;
    ctx.arc(this.x + tileSize/2, this.y + tileSize/2, this.stats.range, 0, Math.PI * 2, false);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.stroke();
  }
}
