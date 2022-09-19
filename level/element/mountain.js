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
}
