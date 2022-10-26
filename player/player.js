import {
  tileSize,
  pixelUnit,
  delta,
  monsters,
  gameScreen,
  sideScreen,
} from "../app.js";
import { Projectile } from "./projectile.js";
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
      nextLvl: 1,
      exp: 0,
      force: 3,
      attackRate: 1,
      range: tileSize * 3,
      soulRessource: 1000,
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
    ctx.lineWidth = 1 * pixelUnit;
    ctx.arc(this.x, this.y, this.stats.range, 0, Math.PI * 2, false);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.stroke();

    if (timestamp >= this.lastAttack + 1000 / this.stats.attackRate) {
      this.autoFire(monsters);
      this.lastAttack = timestamp;
    }
    if (this.stats.exp >= this.stats.nextLvl) {
      this.stats.exp = 0;
      this.stats.nextLvl = Math.round(this.stats.nextLvl * 150) / 100;
    }
    this.drawPlayerLife(ctx);
    this.drawPlayerExp(ctx);
    this.drawSoulRessource(ctx);
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

    const barWidth = tileSize * 9.5;
    const barHeight = tileSize / 3;
    let barX = gameScreen.width + (sideScreen.width - barWidth) / 2;
    let barY = tileSize / 2;

    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.fillRect(barX, barY, barWidth, barHeight);
    ctx.fillStyle = "rgba(0, 175, 0, 0.9)";
    ctx.fillRect(barX, barY, barWidth * barRatio, barHeight);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1 * pixelUnit;
    ctx.strokeRect(barX, barY, barWidth, barHeight);
    ctx.restore();
  }

  drawPlayerExp(ctx) {
    const barRatio = this.stats.exp / this.stats.nextLvl;

    const barWidth = tileSize * 9.5;
    const barHeight = tileSize / 3;
    let barX = gameScreen.width + (sideScreen.width - barWidth) / 2;
    let barY = tileSize / 2 + tileSize / 3;

    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
    ctx.fillRect(barX, barY, barWidth, barHeight);
    ctx.fillStyle = "rgba(39, 161, 245, 0.9)";
    ctx.fillRect(barX, barY, barWidth * barRatio, barHeight);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1 * pixelUnit;
    ctx.strokeRect(barX, barY, barWidth, barHeight);
    ctx.restore();
  }

  drawSoulRessource(ctx) {
    const textX = gameScreen.width + tileSize * 9.75;
    const textY = tileSize * 1.75;
    ctx.font = `${tileSize / 2}px dogicapixel`;
    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.fillText(this.stats.soulRessource, textX, textY);
  }
}

export { Player };
