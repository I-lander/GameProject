const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Player {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.projectiles = []
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  autoFire(enemies) {
    if (enemies.length > 0 && this.projectiles.length <= 1) {
      const angle = Math.atan2(enemies[0].y - this.y, enemies[0].x - this.x);
      const velocity = {
        x: Math.cos(angle) / 2,
        y: Math.sin(angle) / 2,
      };
      const color = "hsl(0, 100%, 100%)";
      this.projectiles.push(new Projectile(this.x, this.y, 5, color, velocity));
    }
  }
}

class Projectile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.speed = 5;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    this.draw();
    this.x += this.velocity.x * this.speed;
    this.y += this.velocity.y * this.speed;
  }
}

export {Player, Projectile}