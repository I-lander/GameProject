import { pixelUnit, tileMap, tileSize } from "../app.js";

export class Enemy {
  constructor(x, y, radius, image = null, color, velocity, speed) {
    this.x = x - tileSize / 2;
    this.y = y + tileSize / 2;
    this.radius = radius;
    this.color = color;
    this.velocity = { x: 0, y: 0 };
    this.speed = speed ?? 0.2;
    this.distance = 0;
    this.position = tileMap.getPosition(this.x, this.y);

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

  moveAlong(ctx, path) {
    if (!path || path.length <= 0) {
      return;
    }

    this.movePath = path;
    this.moveTo(this.movePath.shift());
  }

  moveTo(target) {
    this.moveToTarget = target;
  }

  update(ctx, delta) {
    this.draw(ctx);
    if (this.x < 0) {
      this.velocity.x = 1;
      this.x += this.velocity.x * pixelUnit * delta * this.speed;
    }
    if (this.y < 0) {
      this.velocity.y = 1;
      this.y += this.velocity.y * pixelUnit * delta * this.speed;
    }
    let dx = 0;
    let dy = 0;
    if (this.moveToTarget) {
      dx = this.moveToTarget.x - this.x;
      dy = this.moveToTarget.y - this.y;

      if (Math.abs(dx) < 5) {
        dx = 0;
      }
      if (Math.abs(dy) < 5) {
        dy = 0;
      }

      const angle = Math.atan2(dy, dx);
      this.velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };

      if (!this.velocity.x == 0 && !this.velocity.y == 0) {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
      }

      if (dx === 0 && dy === 0) {
        if (this.movePath.length > 0) {
          this.moveTo(this.movePath.shift());
          return;
        }
        this.moveToTarget = undefined;
      }
    }
  }
}
