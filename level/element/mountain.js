import { tileSize } from "../../app.js";
export class Mountain {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.position = { x: this.x, y: this.y };
    this.maxHp = 5;
    this.hp = this.maxHp;
    this.isAttack = false;
  }

  isAlive() {
    if (this.hp === 0) {
      return false;
    }
  }

  drawLifeBar(ctx) {
    if (this.isAttack) {
      const barRatio = this.hp / this.maxHp;
      ctx.save();
      ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
      ctx.fillRect(
        this.x * tileSize + (tileSize * 0.4) / 2,
        this.y * tileSize - tileSize * 0.1,
        tileSize * 0.6,
        tileSize * 0.1
      );
      ctx.fillStyle = "rgba(0, 255, 0, 0.9)";
      ctx.fillRect(
        this.x * tileSize + (tileSize * 0.4) / 2,
        this.y * tileSize - tileSize * 0.1,
        tileSize * barRatio * 0.6,
        tileSize * 0.1
      );
      ctx.strokeStyle = "white";
      ctx.strokeRect(
        this.x * tileSize + (tileSize * 0.4) / 2,
        this.y * tileSize - tileSize * 0.1,
        tileSize * 0.6,
        tileSize * 0.1
      );
      ctx.restore();
    }
  }
}
