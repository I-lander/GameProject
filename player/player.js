import {
  canvasMenu,
  ctxMenu,
  tileSize,
  pixelUnit,
  delta,
  monsters,
} from "../app.js";

class Player {
  constructor(x, y, position, radius, image) {
    this.x = x;
    this.y = y;
    this.position = position;
    this.radius = radius;
    this.projectiles = [];

    this.maxHp = 30;
    this.stats = {
      hp: this.maxHp,
      force: 3,
      attackRate: 2,
      range: tileSize * 3,
    };
    this.lastAttack = 0;

    this.img = new Image();
    this.img.src = image;
  }

  draw(ctx) {
    let timestamp = Date.now();

    ctx.drawImage(
      this.img,
      this.x - this.radius / 2,
      this.y - this.radius / 2,
      this.radius,
      this.radius
    );
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.stats.range, 0, Math.PI * 2, false);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.stroke();

    if (timestamp >= this.lastAttack + 1000 / this.stats.attackRate) {
      this.autoFire(monsters);
      this.lastAttack = timestamp;
    }

    this.drawPlayerLife(ctxMenu);
  }

  autoFire(monsters) {
    monsters.forEach((monster, index) => {
      monster.distance = Math.hypot(this.x - monster.x, this.y - monster.y);
      if (monster.distance < this.stats.range - monster.hitBox) {
        const angle = Math.atan2(monster.y - this.y, monster.x - this.x);
        const velocity = {
          x: Math.cos(angle) * 5,
          y: Math.sin(angle) * 5,
        };
        if (this.projectiles.length < 1) {
          this.projectiles.push(
            new Projectile(
              this.x,
              this.y,
              5 * pixelUnit,
              "white",
              velocity,
              this.stats.force
            )
          );
        }
      }
    });
  }

  drawPlayerLife(ctx) {
    const barRatio = this.stats.hp / this.maxHp;

    const barWidth = tileSize * 9;
    const barHeight = tileSize / 3
    let barX = (canvasMenu.width - barWidth) / 2;
    let barY = tileSize/2;


    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.fillRect(barX, barY, barWidth, barHeight);
    ctx.fillStyle = "rgba(0, 175, 0, 0.9)";
    ctx.fillRect(barX, barY, barWidth * barRatio, barHeight);
    ctx.strokeStyle = "white";
    ctx.strokeRect(barX, barY, barWidth, barHeight);
    ctx.restore();
  }
}

class Projectile {
  constructor(x, y, radius, color, velocity, force) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.speed = 0.3;
    this.force = force;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update(ctx) {
    this.draw(ctx);
    this.x += this.velocity.x * pixelUnit * delta * this.speed;
    this.y += this.velocity.y * pixelUnit * delta * this.speed;
  }
}

export { Player, Projectile };
