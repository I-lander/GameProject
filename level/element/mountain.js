import { tileSize } from "../../app.js";

export class Mountain {
  constructor(x, y, image) {
    this.x = x * tileSize;
    this.y = y * tileSize;
    this.image = image;
    this.position = { x: x, y: y };
    this.maxHp = 5;
    this.stats = {
      hp: this.maxHp,
    };
    this.isAttack = false;
  }
}
