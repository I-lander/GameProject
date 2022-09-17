import { tileMap } from "../../app.js";
export class Mountain {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.position = { x: this.x, y: this.y };
    this.hp = 5;
  }

  isAlive() {
    if (this.hp === 0) {
      return false;
    }
  }
}
