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

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = tileSize * 2;
    this.numberOfParticles = 20;
    this.particlesArray = [];
    this.isParticlesGenerated = false;
  }

  update(ctx) {
    if (!this.isParticlesGenerated) {
      for (let i = 0; i < this.numberOfParticles; i++) {
        const size = Math.random() * 10 * pixelUnit;
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * this.radius + this.x;
        const y = Math.sin(angle) * this.radius + this.y;

        const angled = Math.atan2(y - this.y, x - this.x);
        const velocity = {
          x: Math.cos(angled),
          y: Math.sin(angled),
        };

        const color = "white";

        const particle = new Particle(this.x, this.y, size, velocity);
        this.particlesArray.push(particle);
        this.isParticlesGenerated = true;
      }
    }

    for (let i = 0; i < this.particlesArray.length; i++) {
      const particle = this.particlesArray[i];
      particle.update(ctx);

      const distance = Math.hypot(this.x - particle.x, this.y - particle.y);

      if (distance >= this.radius || particle.radius <= 0) {
        this.particlesArray.splice(i, 1);
      }
    }
  }
}

export { Particle, Explosion };
