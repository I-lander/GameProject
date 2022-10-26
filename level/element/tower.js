import { tileSize, monsters, pixelUnit } from "../../app.js";
import { Projectile } from "../../player/projectile.js";

export class Tower {
  constructor(x, y, image) {
    this.x = x * tileSize + tileSize / 2;
    this.y = y * tileSize + tileSize / 2;
    this.image = image;
    this.position = { x: x, y: y };
    this.maxHp = 5;
    this.stats = {
      hp: this.maxHp,
      soulLoad: 0,
      maxSoul: 100,
      loadSpeed: 10,
      force: 3,
      attackRate: 1,
      range: tileSize * 2,
    };
    this.projectiles = [];
    this.lastAttack = 0;
  }

  update(ctx) {
    let timestamp = Date.now();

    ctx.beginPath();
    ctx.lineWidth = 1 * pixelUnit;
    ctx.arc(this.x, this.y, this.stats.range, 0, Math.PI * 2, false);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.stroke();

    if (timestamp >= this.lastAttack + 1000 / this.stats.attackRate) {
      this.autoFire(monsters);
      this.lastAttack = timestamp;
    }
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
}
