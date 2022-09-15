import { pixelUnit, tileMap, tileSize } from "../app.js";

export class Enemy {
  constructor(x, y, type, radius, image = null, velocity, speed) {
    this.x = x + tileSize / 2;
    this.y = y + tileSize / 2;
    this.radius = radius;
    this.type = type;
    this.color = "black";
    this.velocity = { x: 0, y: 0 };
    this.speed = speed ?? 0.4;

    this.distance = 0;
    this.position = tileMap.getPosition(this.x, this.y);
    this.path = [];

    this.moveToTarget = {};
    this.isImage = image ? true : false;

    this.hitBox = tileSize / 3;

    this.img = new Image();
    this.img.src = image;
    this.frame = 0;
  }

  draw(ctx) {
    if (this.frame < 15) {
      ctx.drawImage(
        this.img,
        0 * 32,
        0 * 32,
        32,
        32,
        this.x - this.radius / 2,
        this.y - this.radius / 2,
        this.radius,
        this.radius
      );
      this.frame++;
    }

    if (this.frame >= 15) {
      ctx.drawImage(
        this.img,
        1 * 32,
        0 * 32,
        32,
        32,
        this.x - this.radius / 2,
        this.y - this.radius / 2,
        this.radius,
        this.radius
      );
      this.frame++;
    }
    if (this.frame >= 30) {
      this.frame = 0;
    }
  }

  collideWith(element) {
    const self = { x: this.x, y: this.y, width: tileSize, height: tileSize };
    const obstacle = {
      x: element.x * tileSize,
      y: element.y * tileSize,
      width: tileSize,
      height: tileSize,
    };
    if (
      self.x < obstacle.x + obstacle.width &&
      self.x + self.width > obstacle.x &&
      self.y < obstacle.y + obstacle.height &&
      self.y + self.height > obstacle.y
    ) {
      return true;
    }
  }

  moveAlong() {
    if (!this.path || this.path.length <= 0) {
      return;
    }

    this.moveTo(this.path.shift());
  }

  moveTo(target) {
    this.moveToTarget = target;
  }

  update(ctx, delta) {
    this.draw(ctx);

    let dx = 0;
    let dy = 0;
    if (this.moveToTarget) {
      dx = this.moveToTarget.x - this.x;
      dy = this.moveToTarget.y - this.y;
      if (Math.abs(dx) < 1) {
        dx = 0;
      }
      if (Math.abs(dy) < 1) {
        dy = 0;
      }

      const angle = Math.atan2(dy, dx);
      this.velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };

      this.x += this.velocity.x * pixelUnit * delta * this.speed;
      this.y += this.velocity.y * pixelUnit * delta * this.speed;

      if (dx === 0 && dy === 0) {
        if (this.path && this.path.length > 0) {
          this.moveTo(this.path.shift());
          return;
        }
        this.moveToTarget = undefined;
      }
    }
  }
}
