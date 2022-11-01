import { pixelUnit, delta, tileSize } from "../app.js";

class Particle {
  constructor(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "";
    this.velocity = velocity;
    this.speed = 3;
  }

  draw(ctx) {
    this.color = "white";
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.radius, this.radius);
    ctx.restore();
  }

  update(ctx) {
    this.draw(ctx);
    this.x += this.velocity.x * pixelUnit * this.speed * delta;
    this.y += this.velocity.y * pixelUnit * this.speed * delta;
    this.radius -= 0.05 * pixelUnit * delta;
  }
}

export { Particle };
