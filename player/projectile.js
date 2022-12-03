import { pixelUnit, delta, tileSize } from "../app.js";
import { speedFactor } from "../core/utils.js";

class Projectile {
  constructor(x, y, color, velocity, force) {
    this.x = x;
    this.y = y;
    this.radius = 6 * pixelUnit;
    this.color = color;
    this.velocity = velocity;
    this.speed = 0.3;
    this.force = force;
    this.sprite = new Image();
    this.spriteSize = tileSize;
    this.sprite.src = "./src/images/bullet.png";
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.velocity.angle);
    ctx.translate(-this.x, -this.y);
    ctx.drawImage(
      this.sprite,
      this.x - tileSize / 2,
      this.y - tileSize / 2,
      this.spriteSize,
      this.spriteSize
    );
    ctx.restore();
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // ctx.fillStyle = "white";
    // ctx.fill();
  }

  update(ctx) {
    this.draw(ctx);
    this.x += this.velocity.x * pixelUnit * delta * this.speed * speedFactor;
    this.y += this.velocity.y * pixelUnit * delta * this.speed * speedFactor;
  }
}

export { Projectile };
