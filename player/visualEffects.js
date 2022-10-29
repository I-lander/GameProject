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
    this.color = "rgb(100, 100, 100)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(ctx) {
    this.draw(ctx);
    this.x += this.velocity.x * pixelUnit * this.speed * delta;
    this.y += this.velocity.y * pixelUnit * this.speed * delta;
    this.radius -= 0.05 * pixelUnit * delta;
  }
}

export { Particle };
