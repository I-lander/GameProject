import { pixelUnit, delta, tileSize } from "../app.js";

class Projectile {
  constructor(x, y, color, velocity, force) {
    this.x = x;
    this.y = y;
    this.radius = 12 * pixelUnit;
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
    ctx.translate(this.x + tileSize/2, this.y +tileSize/2);
    ctx.rotate(this.velocity.angle);
    ctx.translate(-(this.x +tileSize/2), -(this.y+ tileSize/2));
    ctx.drawImage(
      this.sprite,
      this.x,
      this.y,
      this.spriteSize,
      this.spriteSize
    );
    ctx.restore();
  }

  update(ctx) {
    this.draw(ctx);
    this.x += this.velocity.x * pixelUnit * delta * this.speed;
    this.y += this.velocity.y * pixelUnit * delta * this.speed;
  }
}

export { Projectile };
