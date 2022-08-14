class Player {
  constructor(x, y, radius, image = null, color = null) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.projectiles = [];

    this.isImage = image ? true : false;

    this.img = new Image();
    this.img.src = image;
  }

  draw(ctx) {
    if (this.isImage) {
      ctx.drawImage(
        this.img,
        this.x - this.radius / 2,
        this.y - this.radius / 2,
        this.radius,
        this.radius
      );
    }

    if (this.color) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  autoFire(enemies) {
    if (enemies.length > 0 && this.projectiles.length < 1) {
      enemies.forEach((enemy, index) => {
        enemy.distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);
      });

      enemies.sort((a, b) => {
        return a.distance - b.distance;
      });
      const angle = Math.atan2(enemies[0].y - this.y, enemies[0].x - this.x);
      const velocity = {
        x: Math.cos(angle) * 2,
        y: Math.sin(angle) * 2,
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

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(ctx) {
    this.draw(ctx);
    this.x += this.velocity.x * this.speed;
    this.y += this.velocity.y * this.speed;
  }
}

export { Player, Projectile };
