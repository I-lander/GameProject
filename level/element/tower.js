import { tileSize, pauseDelta, monsters, pixelUnit } from "../../app.js";
import { Projectile } from "../../player/projectile.js";
import { calculateInterval } from "../../core/utils.js";
import { BONUS } from "../../core/levelUp/bonus.js";

export class Tower {
  constructor(x, y, image) {
    this.x = x * tileSize;
    this.y = y * tileSize;
    this.image = image;
    this.position = { x: x, y: y };
    this.maxHp = 5;
    this.stats = {
      hp: this.maxHp,
      loadSpeed: 10,
      force: 3,
      range: tileSize * 2.5,
    };
    this.projectiles = [];
    this.lastAttack = 0;
    this.localPauseDelta = 0;
  }

  update(ctx) {
    let timestamp = Date.now();
    ctx.beginPath();
    ctx.lineWidth = 1 * pixelUnit;
    ctx.arc(
      this.x + tileSize / 2,
      this.y + tileSize / 2,
      this.stats.range,
      0,
      Math.PI * 2,
      false
    );
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.stroke();
    this.autoFire(timestamp, monsters);
  }

  autoFire(timestamp, monsters) {
    if (pauseDelta > 0) {
      this.localPauseDelta = pauseDelta;
    }
    monsters.forEach((monster, index) => {
      monster.distance = Math.hypot(
        this.x + tileSize / 2 - monster.x,
        this.y + tileSize / 2 - monster.y
      );
      if (
        monster.distance < this.stats.range - monster.hitBox &&
        calculateInterval(
          timestamp,
          this.lastAttack,
          1000 - BONUS.TOWER_ATTACK_RATE,
          this.localPauseDelta
        )
      ) {
        const angle = Math.atan2(
          monster.y - this.y - tileSize / 2,
          monster.x - this.x - tileSize / 2
        );
        const velocity = {
          x: Math.cos(angle) * 5,
          y: Math.sin(angle) * 5,
          angle: angle,
        };

        if (this.projectiles.length < 1) {
          this.projectiles.push(
            new Projectile(
              this.x + tileSize / 2,
              this.y + tileSize / 2,
              "white",
              velocity,
              this.stats.force + BONUS.TOWER_FORCE
            )
          );
        }
        this.lastAttack = timestamp;

        this.localPauseDelta = 0;
      }
    });
  }
}
